# Site officiel de Michelet Nestor

Site vitrine d'une personnalité publique : **Angular 22** (SSR + pré-rendu), **Tailwind CSS 4** et serveur **Express**.

## Démarrage

```bash
npm install
npm start                 # développement : http://localhost:4200
npm run build             # build de production (génère aussi sitemap.xml et robots.txt)
npm run serve:ssr:micheletnestor   # lance le build de production : http://localhost:4000
npm test                  # tests unitaires (Vitest)
```

Node.js ≥ 22.18 est requis (le script SEO est exécuté directement en TypeScript).

## Modifier le contenu (sans toucher au code des pages)

Tout le contenu est centralisé dans `src/app/core/` :

| Fichier | Contenu |
| --- | --- |
| `site.config.ts` | URL du site, e-mails, téléphone, réseaux sociaux, menu, mentions légales |
| `content/profile.ts` | Biographie, citation, chiffres clés, valeurs, parcours, engagements |
| `content/news.ts` | Articles d'actualité (chaque article devient une page `/actualites/<slug>`) |
| `content/media.ts` | Revue de presse et vidéos YouTube |

Images : placer les fichiers dans `public/images/` puis mettre à jour les chemins
(`portrait` : 800×1000 minimum ; articles : 1200×675 ; partage réseaux sociaux : 1200×630 JPG/PNG).

> ⚠️ Les textes et visuels actuels sont des **exemples** à remplacer avant la mise en ligne.

## Architecture

```
src/
├── app/
│   ├── core/            contenu, types, SEO (SeoService + données structurées schema.org)
│   ├── layout/          en-tête (menu mobile accessible) et pied de page
│   ├── shared/          composants réutilisables (icônes, cartes, partage, lecteur YouTube…)
│   ├── pages/           une page = un composant chargé à la demande
│   ├── app.routes.ts            routes navigateur
│   └── app.routes.server.ts     stratégie de rendu (pré-rendu / SSR / 404)
├── server/contact.ts    API POST /api/contact
└── server.ts            serveur Express (en-têtes de sécurité, cache, SSR)
scripts/generate-seo-files.ts    génère public/sitemap.xml et public/robots.txt
```

## SEO on-page intégré

- **Pré-rendu HTML** de toutes les pages et de tous les articles au build : contenu indexable immédiatement.
- Par page : `<title>`, meta description, `robots`, **URL canonique**, **Open Graph**, **Twitter Cards**.
- **Données structurées JSON-LD** : `Person`, `WebSite`, `WebPage`, `ProfilePage`, `NewsArticle`,
  `CollectionPage`, `ContactPage`, `VideoObject`, `BreadcrumbList`.
- `sitemap.xml` et `robots.txt` générés automatiquement à partir du contenu.
- Vrai statut HTTP **404** + `noindex` pour les pages inexistantes (pas de « soft 404 »).
- Un seul `<h1>` par page, hiérarchie de titres cohérente, fil d'Ariane, `lang="fr"`, textes alternatifs.
- Performance : chargement différé des pages, images optimisées (`NgOptimizedImage`), polices intégrées
  au build, lecteur YouTube « façade » (chargé seulement au clic), cache long des fichiers versionnés.

## Accessibilité et responsive

Mise en page mobile-first testée de 390 px à 1440 px, lien d'évitement, focus visibles, navigation
clavier (Échap ferme le menu), attributs ARIA, respect de `prefers-reduced-motion`.

## Formulaire de contact

Le formulaire envoie les messages à `POST /api/contact` (validation, anti-spam « pot de miel »,
limite de 5 envois / 15 min par IP). Le serveur transmet chaque message en JSON au webhook
défini par la variable d'environnement :

```bash
CONTACT_WEBHOOK_URL=https://hook.exemple.com/...   # Make, Zapier, n8n, Formspree, Slack…
```

Sans cette variable, le formulaire affiche un message invitant à écrire directement par e-mail.

## Mise en ligne : liste de contrôle

1. Renseigner `SITE.url` (`site.config.ts`) avec le domaine définitif.
2. Ajouter ce domaine dans `angular.json` → `security.allowedHosts` (protection SSRF d'Angular ;
   ou variable d'environnement `NG_ALLOWED_HOSTS`).
3. Remplacer les contenus et images d'exemple, compléter les mentions légales (hébergeur).
4. Définir `CONTACT_WEBHOOK_URL` sur le serveur.
5. Déployer sur un hébergeur Node (le serveur écoute sur `PORT`, 4000 par défaut) derrière HTTPS.
6. Déclarer le site et le sitemap dans Google Search Console et Bing Webmaster Tools.
