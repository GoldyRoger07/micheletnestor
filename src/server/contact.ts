import express, { Router } from 'express';

/**
 * POST /api/contact
 *
 * Valide le message puis le transmet en JSON au webhook défini par la variable
 * d'environnement CONTACT_WEBHOOK_URL (Make, Zapier, n8n, Formspree, Slack, etc.).
 * Sans webhook configuré, l'API répond 503 et le formulaire affiche l'adresse e-mail de secours.
 */

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Nettoyage opportuniste pour éviter que la Map ne grossisse indéfiniment.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        hits.delete(key);
      }
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

function text(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export const contactRouter = Router();

contactRouter.post('/', express.json({ limit: '20kb' }), async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;

  // Pot de miel rempli : robot. On répond « succès » sans rien transmettre.
  if (text(body['website'], 200)) {
    res.status(200).json({ ok: true });
    return;
  }

  if (isRateLimited(req.ip ?? 'unknown')) {
    res.status(429).json({ message: 'Trop de messages envoyés. Merci de réessayer plus tard.' });
    return;
  }

  const message = {
    name: text(body['name'], 100),
    email: text(body['email'], 200),
    subject: text(body['subject'], 100),
    message: text(body['message'], 5000),
  };

  if (
    message.name.length < 2 ||
    !EMAIL_PATTERN.test(message.email) ||
    message.message.length < 10 ||
    body['consent'] !== true
  ) {
    res.status(400).json({ message: 'Certains champs sont invalides. Merci de vérifier le formulaire.' });
    return;
  }

  const webhookUrl = process.env['CONTACT_WEBHOOK_URL'];
  if (!webhookUrl) {
    console.error('[contact] CONTACT_WEBHOOK_URL non configurée : message non transmis.');
    res.status(503).json({
      message: 'Le formulaire est momentanément indisponible. Merci de nous écrire directement par e-mail.',
    });
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...message, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      throw new Error(`Webhook HTTP ${response.status}`);
    }
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[contact] Échec de transmission :', error);
    res.status(502).json({
      message: 'L’envoi a échoué. Merci de réessayer ou de nous écrire directement par e-mail.',
    });
  }
});
