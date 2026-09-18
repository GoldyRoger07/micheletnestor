import type { NavLink, SitemapEntry, SocialLink } from './models';

/**
 * Configuration globale du site.
 * ⚠️ À PERSONNALISER avant la mise en ligne : `url`, `contact`, `socials`, `legal`.
 */
export const SITE = {
  /** URL de production, SANS slash final. Sert aux URL canoniques, Open Graph et au sitemap. */
  url: 'https://www.micheletnestor.com',
  name: 'Michelet Nestor',
  locale: 'fr_FR',
  language: 'fr',
  /** Couleur de la barre d'adresse mobile (meta theme-color). */
  themeColor: '#0f1b2d',
  /** Image de partage par défaut (1200×630). */
  defaultImage: {
    src: '/images/og-default.png',
    alt: 'Michelet Nestor — site officiel',
    width: 1200,
    height: 630,
  },
  /** Compte X/Twitter sans « @ » (laisser vide si aucun). */
  twitterHandle: '',
  contact: {
    email: 'contact@micheletnestor.com',
    pressEmail: 'presse@micheletnestor.com',
    phone: '',
    address: '',
  },
  socials: [
    { network: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
    { network: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
    { network: 'x', label: 'X (Twitter)', url: 'https://x.com/' },
    { network: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/' },
  ] satisfies SocialLink[] as SocialLink[],
  legal: {
    publisher: 'Michelet Nestor',
    publicationDirector: 'Michelet Nestor',
    host: 'À compléter : nom, adresse et téléphone de l’hébergeur',
  },
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Accueil', path: '/' },
  { label: 'Biographie', path: '/biographie' },
  { label: 'Engagements', path: '/engagements' },
  { label: 'Actualités', path: '/actualites' },
  { label: 'Médias', path: '/medias' },
  { label: 'Contact', path: '/contact' },
];

/** Pages statiques déclarées dans le sitemap (les articles sont ajoutés automatiquement). */
export const SITEMAP_PAGES: SitemapEntry[] = [
  { path: '/', changefreq: 'weekly', priority: 1 },
  { path: '/biographie', changefreq: 'monthly', priority: 0.9 },
  { path: '/engagements', changefreq: 'monthly', priority: 0.8 },
  { path: '/actualites', changefreq: 'weekly', priority: 0.8 },
  { path: '/medias', changefreq: 'monthly', priority: 0.7 },
  { path: '/contact', changefreq: 'yearly', priority: 0.6 },
  { path: '/mentions-legales', changefreq: 'yearly', priority: 0.2 },
];
