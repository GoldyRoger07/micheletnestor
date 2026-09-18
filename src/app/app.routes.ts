import { Routes } from '@angular/router';

/** Chaque page est chargée à la demande (code splitting) pour alléger le premier affichage. */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  {
    path: 'biographie',
    loadComponent: () => import('./pages/biography/biography').then((m) => m.Biography),
  },
  {
    path: 'engagements',
    loadComponent: () => import('./pages/engagements/engagements').then((m) => m.Engagements),
  },
  {
    path: 'actualites',
    loadComponent: () => import('./pages/news/news-list').then((m) => m.NewsList),
  },
  {
    path: 'actualites/:slug',
    loadComponent: () => import('./pages/news/news-detail').then((m) => m.NewsDetail),
  },
  { path: 'medias', loadComponent: () => import('./pages/media/media').then((m) => m.Media) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact) },
  {
    path: 'mentions-legales',
    loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
