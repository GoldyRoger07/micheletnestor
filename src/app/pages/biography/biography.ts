import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROFILE } from '../../core/content/profile';
import { Breadcrumb, SeoService } from '../../core/seo/seo.service';
import { profilePageSchema } from '../../core/seo/structured-data';
import { Icon } from '../../shared/icon';
import { PageHeader } from '../../shared/page-header';
import { RichText } from '../../shared/rich-text';

@Component({
  selector: 'app-biography',
  imports: [NgOptimizedImage, RouterLink, Icon, PageHeader, RichText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      eyebrow="Biographie"
      [title]="'Qui est ' + profile.name + ' ?'"
      [lead]="profile.shortBio[0]"
      [breadcrumbs]="breadcrumbs"
    />

    <section class="section bg-paper" aria-label="Biographie">
      <div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <aside class="lg:col-span-4">
          <div class="lg:sticky lg:top-28">
            <div class="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink shadow-xl">
              <img [ngSrc]="profile.portrait.src" [alt]="profile.portrait.alt" fill priority class="object-cover" />
            </div>
            <dl class="card mt-6 divide-y divide-line p-6 text-sm">
              <div class="flex justify-between gap-4 py-3 first:pt-0">
                <dt class="text-muted">Nom</dt>
                <dd class="text-right font-semibold text-ink">{{ profile.name }}</dd>
              </div>
              <div class="flex justify-between gap-4 py-3">
                <dt class="text-muted">Fonction</dt>
                <dd class="text-right font-semibold text-ink">{{ profile.jobTitle }}</dd>
              </div>
              @if (profile.birthPlace) {
                <div class="flex justify-between gap-4 py-3">
                  <dt class="text-muted">Lieu de naissance</dt>
                  <dd class="text-right font-semibold text-ink">{{ profile.birthPlace }}</dd>
                </div>
              }
              <div class="flex justify-between gap-4 py-3 last:pb-0">
                <dt class="text-muted">Domaines</dt>
                <dd class="text-right font-semibold text-ink">{{ profile.knowsAbout.join(', ') }}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <div class="lg:col-span-8">
          <app-rich-text [blocks]="profile.longBio" />
        </div>
      </div>
    </section>

    <section class="section bg-white" aria-labelledby="timeline-title">
      <div class="container-page">
        <p class="eyebrow text-gold-700">Parcours</p>
        <h2 id="timeline-title" class="section-title mt-3">Les grandes étapes</h2>

        <ol class="relative mt-14 border-l-2 border-gold-500/40 pl-8 md:ml-4 md:pl-12">
          @for (step of profile.timeline; track $index) {
            <li class="reveal relative pb-12 last:pb-0">
              <span
                class="absolute -left-[2.6rem] top-1 h-5 w-5 rounded-full border-4 border-white bg-gold-500 shadow md:-left-[3.6rem]"
                aria-hidden="true"
              ></span>
              <p class="text-sm font-semibold uppercase tracking-wider text-gold-700">{{ step.period }}</p>
              <h3 class="mt-2 font-display text-2xl text-ink">{{ step.title }}</h3>
              @if (step.organization) {
                <p class="mt-1 font-medium text-ink/70">{{ step.organization }}</p>
              }
              <p class="mt-3 max-w-2xl text-muted">{{ step.description }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="section bg-paper" aria-labelledby="values-title">
      <div class="container-page">
        <p class="eyebrow text-gold-700">Valeurs</p>
        <h2 id="values-title" class="section-title mt-3">Ce qui l’anime</h2>
        <ul class="mt-12 grid gap-6 md:grid-cols-3">
          @for (value of profile.values; track value.title) {
            <li class="reveal card p-8">
              <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-gold-300">
                <app-icon [name]="value.icon" [size]="26" />
              </span>
              <h3 class="mt-6 font-display text-2xl text-ink">{{ value.title }}</h3>
              <p class="mt-3 text-muted">{{ value.text }}</p>
            </li>
          }
        </ul>
        <div class="mt-14 flex flex-col gap-4 sm:flex-row">
          <a routerLink="/engagements" class="btn btn-dark">Ses engagements <app-icon name="arrow-right" [size]="18" /></a>
          <a routerLink="/contact" class="btn btn-outline-dark">Contact presse</a>
        </div>
      </div>
    </section>
  `,
})
export class Biography {
  protected readonly profile = PROFILE;
  protected readonly breadcrumbs: Breadcrumb[] = [{ name: 'Biographie', path: '/biographie' }];

  constructor() {
    inject(SeoService).update({
      title: `Biographie de ${PROFILE.name}`,
      description: `Biographie de ${PROFILE.name} : parcours, grandes étapes, valeurs et engagements. ${PROFILE.shortBio[0]}`.slice(0, 160),
      path: '/biographie',
      type: 'profile',
      image: PROFILE.portrait,
      breadcrumbs: this.breadcrumbs,
      schema: [profilePageSchema('/biographie')],
    });
  }
}
