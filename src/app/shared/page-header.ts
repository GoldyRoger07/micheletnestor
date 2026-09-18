import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Breadcrumb } from '../core/seo/seo.service';

/** En-tête des pages intérieures : fil d'Ariane visible + titre H1 unique. */
@Component({
  selector: 'app-page-header',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="relative overflow-hidden bg-ink text-paper">
      <div class="hero-pattern pointer-events-none absolute inset-0 opacity-60" aria-hidden="true"></div>
      <div class="container-page relative pb-14 pt-32 md:pb-20 md:pt-40">
        <nav aria-label="Fil d’Ariane" class="mb-6 text-sm text-paper/70">
          <ol class="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li><a routerLink="/" class="hover:text-gold-300">Accueil</a></li>
            @for (crumb of breadcrumbs(); track crumb.path; let last = $last) {
              <li aria-hidden="true" class="text-paper/40">/</li>
              <li>
                @if (last) {
                  <span aria-current="page" class="text-paper">{{ crumb.name }}</span>
                } @else {
                  <a [routerLink]="crumb.path" class="hover:text-gold-300">{{ crumb.name }}</a>
                }
              </li>
            }
          </ol>
        </nav>
        @if (eyebrow()) {
          <p class="eyebrow text-gold-300">{{ eyebrow() }}</p>
        }
        <h1 class="mt-3 max-w-4xl font-display text-4xl leading-tight text-balance sm:text-5xl md:text-6xl">
          {{ title() }}
        </h1>
        @if (lead()) {
          <p class="mt-5 max-w-2xl text-lg text-paper/80 md:text-xl">{{ lead() }}</p>
        }
        <ng-content />
      </div>
    </header>
  `,
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly eyebrow = input<string>();
  readonly lead = input<string>();
  readonly breadcrumbs = input<Breadcrumb[]>([]);
}
