import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { NEWS } from '../../core/content/news';
import { PROFILE } from '../../core/content/profile';
import { Breadcrumb, SeoService } from '../../core/seo/seo.service';
import { absoluteUrl } from '../../core/seo/structured-data';
import { NewsCard } from '../../shared/news-card';
import { PageHeader } from '../../shared/page-header';

const ALL = 'Toutes';

@Component({
  selector: 'app-news-list',
  imports: [NewsCard, PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      eyebrow="Actualités"
      title="Actualités et communiqués"
      [lead]="'Annonces, déplacements, interventions : suivez l’action de ' + profile.name + '.'"
      [breadcrumbs]="breadcrumbs"
    />

    <section class="section bg-paper" aria-label="Liste des actualités">
      <div class="container-page">
        @if (categories.length > 2) {
          <div class="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
            @for (category of categories; track category) {
              <button
                type="button"
                class="chip"
                [class.chip-active]="category === selected()"
                [attr.aria-pressed]="category === selected()"
                (click)="selected.set(category)"
              >
                {{ category }}
              </button>
            }
          </div>
        }

        @if (articles().length) {
          <ul class="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            @for (article of articles(); track article.slug) {
              <li><app-news-card [article]="article" /></li>
            }
          </ul>
        } @else {
          <p class="mt-10 text-lg text-muted">Aucune actualité pour le moment.</p>
        }
      </div>
    </section>
  `,
})
export class NewsList {
  protected readonly profile = PROFILE;
  protected readonly breadcrumbs: Breadcrumb[] = [{ name: 'Actualités', path: '/actualites' }];
  protected readonly categories = [ALL, ...new Set(NEWS.map((article) => article.category))];
  protected readonly selected = signal(ALL);
  protected readonly articles = computed(() =>
    this.selected() === ALL ? NEWS : NEWS.filter((article) => article.category === this.selected()),
  );

  constructor() {
    inject(SeoService).update({
      title: 'Actualités',
      description: `Toute l’actualité de ${PROFILE.name} : annonces, communiqués, déplacements et interventions publiques.`,
      path: '/actualites',
      breadcrumbs: this.breadcrumbs,
      schema: [
        {
          '@type': 'CollectionPage',
          url: absoluteUrl('/actualites'),
          name: `Actualités de ${PROFILE.name}`,
          hasPart: NEWS.map((article) => ({
            '@type': 'NewsArticle',
            headline: article.title,
            url: absoluteUrl(`/actualites/${article.slug}`),
            datePublished: article.date,
          })),
        },
      ],
    });
  }
}
