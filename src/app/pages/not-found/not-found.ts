import { ChangeDetectionStrategy, Component, RESPONSE_INIT, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { SeoService } from '../../core/seo/seo.service';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative flex min-h-[80vh] items-center overflow-hidden bg-ink text-paper">
      <div class="hero-pattern pointer-events-none absolute inset-0" aria-hidden="true"></div>
      <div class="container-page relative py-40 text-center">
        <p class="font-display text-8xl text-gold-500 md:text-9xl">404</p>
        <h1 class="mt-6 font-display text-3xl md:text-5xl">Page introuvable</h1>
        <p class="mx-auto mt-4 max-w-xl text-lg text-paper/80">
          La page que vous recherchez n’existe pas ou a été déplacée.
        </p>
        <div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a routerLink="/" class="btn btn-gold"><app-icon name="arrow-left" [size]="18" /> Retour à l’accueil</a>
          <a routerLink="/actualites" class="btn btn-outline-light">Voir les actualités</a>
        </div>
      </div>
    </section>
  `,
})
export class NotFound {
  constructor() {
    // Vrai statut HTTP 404 côté serveur (évite les « soft 404 » signalées par Google).
    const responseInit = inject(RESPONSE_INIT, { optional: true });
    if (responseInit) {
      responseInit.status = 404;
    }

    inject(SeoService).update({
      title: 'Page introuvable',
      description: 'La page demandée n’existe pas ou a été déplacée.',
      path: inject(Router).url.split(/[?#]/)[0],
      noindex: true,
    });
  }
}
