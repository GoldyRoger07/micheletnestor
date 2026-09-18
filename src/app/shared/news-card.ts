import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NewsArticle } from '../core/models';
import { Icon } from './icon';

@Component({
  selector: 'app-news-card',
  imports: [RouterLink, NgOptimizedImage, DatePipe, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
  template: `
    <article
      class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-gold-500"
    >
      <div class="aspect-[16/9] overflow-hidden bg-ink/5">
        <img
          [ngSrc]="article().image.src"
          [alt]="article().image.alt"
          [width]="article().image.width"
          [height]="article().image.height"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div class="flex flex-1 flex-col p-6">
        <div class="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
          <span class="rounded-full bg-gold-100 px-3 py-1 text-gold-800">{{ article().category }}</span>
          <time [attr.datetime]="article().date">{{ article().date | date: 'longDate' }}</time>
        </div>
        <h3 class="mt-4 font-display text-xl leading-snug text-ink">
          <a [routerLink]="['/actualites', article().slug]" class="after:absolute after:inset-0 focus:outline-none">
            {{ article().title }}
          </a>
        </h3>
        <p class="mt-3 line-clamp-3 text-muted">{{ article().excerpt }}</p>
        <span class="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-gold-700">
          Lire l’article
          <app-icon name="arrow-right" [size]="16" class="transition group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  `,
})
export class NewsCard {
  readonly article = input.required<NewsArticle>();
}
