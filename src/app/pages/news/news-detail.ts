import { DatePipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { NEWS, findArticle } from '../../core/content/news';
import { Breadcrumb, SeoService } from '../../core/seo/seo.service';
import { articleSchema } from '../../core/seo/structured-data';
import { Icon } from '../../shared/icon';
import { NewsCard } from '../../shared/news-card';
import { PageHeader } from '../../shared/page-header';
import { RichText } from '../../shared/rich-text';
import { ShareButtons } from '../../shared/share-buttons';
import { NotFound } from '../not-found/not-found';

const WORDS_PER_MINUTE = 200;

@Component({
  selector: 'app-news-detail',
  imports: [DatePipe, NgOptimizedImage, RouterLink, Icon, NewsCard, PageHeader, RichText, ShareButtons, NotFound],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (article(); as article) {
      <article>
        <app-page-header [title]="article.title" [eyebrow]="article.category" [breadcrumbs]="breadcrumbs()">
          <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-paper/75">
            <span class="inline-flex items-center gap-2">
              <app-icon name="calendar" [size]="16" />
              <time [attr.datetime]="article.date">{{ article.date | date: 'longDate' }}</time>
            </span>
            <span class="inline-flex items-center gap-2">
              <app-icon name="clock" [size]="16" /> {{ readingTime() }} min de lecture
            </span>
          </div>
        </app-page-header>

        <div class="bg-paper">
          <div class="container-page max-w-4xl py-12 md:py-16">
            <div class="overflow-hidden rounded-3xl shadow-xl">
              <img
                [ngSrc]="article.image.src"
                [alt]="article.image.alt"
                [width]="article.image.width"
                [height]="article.image.height"
                priority
                class="h-auto w-full"
              />
            </div>

            <p class="mt-12 font-display text-2xl leading-relaxed text-ink">{{ article.excerpt }}</p>
            <app-rich-text class="mt-8" [blocks]="article.body" />

            <div class="mt-12 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <app-share-buttons [path]="'/actualites/' + article.slug" [title]="article.title" />
              <a routerLink="/actualites" class="link-arrow">
                <app-icon name="arrow-left" [size]="18" /> Toutes les actualités
              </a>
            </div>
          </div>
        </div>
      </article>

      @if (related().length) {
        <section class="section bg-white" aria-labelledby="related-title">
          <div class="container-page">
            <h2 id="related-title" class="section-title">À lire aussi</h2>
            <ul class="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              @for (item of related(); track item.slug) {
                <li><app-news-card [article]="item" /></li>
              }
            </ul>
          </div>
        </section>
      }
    } @else {
      <app-not-found />
    }
  `,
})
export class NewsDetail {
  private readonly seo = inject(SeoService);

  /** Paramètre de route `:slug` (lié via withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly article = computed(() => findArticle(this.slug()));

  protected readonly breadcrumbs = computed<Breadcrumb[]>(() => {
    const article = this.article();
    return [
      { name: 'Actualités', path: '/actualites' },
      ...(article ? [{ name: article.title, path: `/actualites/${article.slug}` }] : []),
    ];
  });

  protected readonly readingTime = computed(() => {
    const article = this.article();
    const words = article ? [article.excerpt, ...article.body].join(' ').split(/\s+/).length : 0;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  });

  protected readonly related = computed(() => {
    const current = this.article();
    return current ? NEWS.filter((item) => item.slug !== current.slug).slice(0, 3) : [];
  });

  constructor() {
    effect(() => {
      const article = this.article();
      if (!article) {
        return; // Slug inconnu : <app-not-found> gère le statut 404 et le noindex.
      }
      this.seo.update({
        title: article.title,
        description: article.excerpt,
        path: `/actualites/${article.slug}`,
        type: 'article',
        image: article.image,
        publishedTime: article.date,
        modifiedTime: article.updated ?? article.date,
        breadcrumbs: this.breadcrumbs(),
        schema: [articleSchema(article)],
      });
    });
  }
}
