import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PHOTOS } from '../../core/content/photos';
import { ENGAGEMENTS, PROFILE } from '../../core/content/profile';
import { Breadcrumb, SeoService } from '../../core/seo/seo.service';
import { Icon } from '../../shared/icon';
import { PageHeader } from '../../shared/page-header';

@Component({
  selector: 'app-engagements',
  imports: [NgOptimizedImage, RouterLink, Icon, PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      eyebrow="Engagements"
      title="Des causes, des actions, des résultats"
      [lead]="'Les priorités qui structurent l’action de ' + profile.name + ' au service de la communauté.'"
      [breadcrumbs]="breadcrumbs"
    >
      <nav aria-label="Aller à un engagement" class="mt-8 flex flex-wrap gap-2">
        @for (engagement of engagements; track engagement.id) {
          <a routerLink="/engagements" [fragment]="engagement.id" class="chip chip-dark">{{ engagement.title }}</a>
        }
      </nav>
    </app-page-header>

    <div class="bg-paper">
      @for (engagement of engagements; track engagement.id; let odd = $odd; let index = $index) {
        <section [id]="engagement.id" class="section scroll-mt-20" [class.bg-white]="odd" [attr.aria-labelledby]="engagement.id + '-title'">
          <div class="container-page grid items-start gap-10 md:grid-cols-12">
            <div class="md:col-span-5">
              <span class="font-display text-6xl text-gold-500/40" aria-hidden="true">0{{ index + 1 }}</span>
              <div class="mt-2 flex items-center gap-4">
                <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-gold-300">
                  <app-icon [name]="engagement.icon" [size]="28" />
                </span>
                <h2 [id]="engagement.id + '-title'" class="section-title">{{ engagement.title }}</h2>
              </div>
            </div>
            <div class="reveal md:col-span-7">
              <p class="text-xl text-ink/85">{{ engagement.summary }}</p>
              <ul class="mt-8 space-y-4">
                @for (point of engagement.points; track point) {
                  <li class="flex items-start gap-3">
                    <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                      <app-icon name="check" [size]="14" />
                    </span>
                    <span class="text-muted">{{ point }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>
        </section>
      }
    </div>

    <section class="section bg-white" aria-labelledby="terrain-title">
      <div class="container-page">
        <p class="eyebrow text-gold-700">Sur le terrain</p>
        <h2 id="terrain-title" class="section-title mt-3">Au plus près des citoyens</h2>
        <ul class="mt-12 grid gap-6 md:grid-cols-2">
          @for (photo of fieldPhotos; track photo.src) {
            <li class="reveal relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink shadow-xl">
              <img [ngSrc]="photo.src" [alt]="photo.alt" fill sizes="(min-width: 768px) 50vw, 100vw" class="object-cover" />
            </li>
          }
        </ul>
      </div>
    </section>

    <section class="bg-ink py-16 text-paper">
      <div class="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <h2 class="font-display text-3xl">Vous souhaitez soutenir ou rejoindre une initiative ?</h2>
        <a routerLink="/contact" class="btn btn-gold shrink-0">Nous contacter <app-icon name="arrow-right" [size]="18" /></a>
      </div>
    </section>
  `,
})
export class Engagements {
  protected readonly profile = PROFILE;
  protected readonly engagements = ENGAGEMENTS;
  protected readonly fieldPhotos = [PHOTOS.saluantUnCivil, PHOTOS.saluantLaFoule];
  protected readonly breadcrumbs: Breadcrumb[] = [{ name: 'Engagements', path: '/engagements' }];

  constructor() {
    inject(SeoService).update({
      title: 'Engagements et causes défendues',
      description: `Découvrez les engagements de ${PROFILE.name} : ${ENGAGEMENTS.map((e) => e.title.toLowerCase()).join(', ')}.`.slice(0, 160),
      path: '/engagements',
      breadcrumbs: this.breadcrumbs,
    });
  }
}
