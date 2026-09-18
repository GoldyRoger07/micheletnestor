import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

import { NEWS } from './core/content/news';

/**
 * Toutes les pages connues sont pré-rendues en HTML statique au build (SEO + performance).
 * Les URL inconnues sont rendues à la demande par le serveur avec un vrai statut 404.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'actualites/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => NEWS.map((article) => ({ slug: article.slug })),
    fallback: PrerenderFallback.Server,
  },
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'biographie', renderMode: RenderMode.Prerender },
  { path: 'engagements', renderMode: RenderMode.Prerender },
  { path: 'actualites', renderMode: RenderMode.Prerender },
  { path: 'medias', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'mentions-legales', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
