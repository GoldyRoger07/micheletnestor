/**
 * Types partagés par le contenu du site.
 *
 * IMPORTANT : les fichiers de contenu (`site.config.ts`, `content/*.ts`) sont aussi lus
 * par `scripts/generate-seo-files.ts` via Node (type stripping). Ils ne doivent donc
 * contenir que des `import type` et aucune syntaxe TypeScript non effaçable (enum, namespace…).
 */

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type SocialNetwork = 'facebook' | 'instagram' | 'x' | 'linkedin' | 'youtube' | 'tiktok';

export interface SocialLink {
  network: SocialNetwork;
  label: string;
  url: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface SitemapEntry {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface KeyFigure {
  value: string;
  label: string;
}

export interface Value {
  title: string;
  text: string;
  icon: IconName;
}

export interface TimelineEntry {
  period: string;
  title: string;
  organization?: string;
  description: string;
}

export interface Quote {
  text: string;
  context?: string;
}

export interface Profile {
  /** Nom complet tel qu'affiché et indexé. */
  name: string;
  givenName: string;
  familyName: string;
  /** Fonction principale (utilisée dans le titre SEO et le schéma Person). */
  jobTitle: string;
  /** Phrase d'accroche de la page d'accueil. */
  tagline: string;
  /** Résumé en 1–2 phrases (≈ 150 caractères) : sert aussi de meta description par défaut. */
  summary: string;
  /** Biographie courte (page d'accueil). */
  shortBio: string[];
  /** Biographie complète (page Biographie). */
  longBio: string[];
  portrait: ImageAsset;
  birthPlace?: string;
  nationality?: string;
  /** Domaines d'expertise → `knowsAbout` du schéma Person. */
  knowsAbout: string[];
  quote: Quote;
  keyFigures: KeyFigure[];
  values: Value[];
  timeline: TimelineEntry[];
}

export interface Engagement {
  id: string;
  title: string;
  summary: string;
  points: string[];
  icon: IconName;
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  /** Date ISO 8601 (AAAA-MM-JJ). */
  date: string;
  updated?: string;
  category: string;
  image: ImageAsset;
  /** Paragraphes du corps de l'article. Une ligne commençant par `## ` devient un intertitre. */
  body: string[];
}

export interface PressItem {
  title: string;
  outlet: string;
  date: string;
  type: 'Article' | 'Interview' | 'Tribune' | 'Émission' | 'Podcast';
  url?: string;
}

export interface VideoItem {
  title: string;
  youtubeId: string;
  date: string;
  description?: string;
}

export type IconName =
  | 'arrow-right'
  | 'arrow-left'
  | 'menu'
  | 'close'
  | 'mail'
  | 'phone'
  | 'map-pin'
  | 'calendar'
  | 'clock'
  | 'quote'
  | 'play'
  | 'link'
  | 'check'
  | 'external'
  | 'users'
  | 'book'
  | 'heart'
  | 'globe'
  | 'briefcase'
  | 'award'
  | 'megaphone'
  | 'scale'
  | 'sprout'
  | 'whatsapp'
  | SocialNetwork;
