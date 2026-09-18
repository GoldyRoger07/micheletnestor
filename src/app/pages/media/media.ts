import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PRESS, VIDEOS } from '../../core/content/media';
import { PROFILE } from '../../core/content/profile';
import { Breadcrumb, SeoService } from '../../core/seo/seo.service';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';
import { PageHeader } from '../../shared/page-header';
import { YoutubePlayer } from '../../shared/youtube-player';

@Component({
  selector: 'app-media',
  imports: [DatePipe, RouterLink, Icon, PageHeader, YoutubePlayer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      eyebrow="Médias"
      title="Presse, vidéos et interventions"
      [lead]="'Retrouvez les apparitions médiatiques, interviews et prises de parole de ' + profile.name + '.'"
      [breadcrumbs]="breadcrumbs"
    />

    @if (videos.length) {
      <section class="section bg-paper" aria-labelledby="videos-title">
        <div class="container-page">
          <p class="eyebrow text-gold-700">Vidéos</p>
          <h2 id="videos-title" class="section-title mt-3">Discours et interviews</h2>
          <ul class="mt-12 grid gap-10 md:grid-cols-2">
            @for (video of videos; track video.youtubeId) {
              <li>
                <app-youtube-player [videoId]="video.youtubeId" [title]="video.title" />
                <h3 class="mt-5 font-display text-xl text-ink">{{ video.title }}</h3>
                <p class="mt-1 text-sm text-muted">
                  <time [attr.datetime]="video.date">{{ video.date | date: 'longDate' }}</time>
                </p>
                @if (video.description) {
                  <p class="mt-2 text-muted">{{ video.description }}</p>
                }
              </li>
            }
          </ul>
        </div>
      </section>
    }

    <section class="section bg-white" aria-labelledby="press-title">
      <div class="container-page">
        <p class="eyebrow text-gold-700">Revue de presse</p>
        <h2 id="press-title" class="section-title mt-3">Dans les médias</h2>

        <ul class="mt-12 divide-y divide-line border-y border-line">
          @for (item of press; track item.title) {
            <li class="reveal group relative grid gap-2 py-7 md:grid-cols-12 md:items-center md:gap-6">
              <p class="text-sm text-muted md:col-span-2">
                <time [attr.datetime]="item.date">{{ item.date | date: 'mediumDate' }}</time>
              </p>
              <p class="md:col-span-2">
                <span class="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-800">
                  {{ item.type }}
                </span>
              </p>
              <div class="md:col-span-7">
                <h3 class="font-display text-xl text-ink">
                  @if (item.url) {
                    <a [href]="item.url" target="_blank" rel="noopener noreferrer" class="after:absolute after:inset-0 group-hover:text-gold-700">
                      {{ item.title }}
                    </a>
                  } @else {
                    {{ item.title }}
                  }
                </h3>
                <p class="mt-1 text-muted">{{ item.outlet }}</p>
              </div>
              @if (item.url) {
                <span class="hidden justify-end text-gold-700 md:col-span-1 md:flex" aria-hidden="true">
                  <app-icon name="external" [size]="20" />
                </span>
              }
            </li>
          }
        </ul>
      </div>
    </section>

    <section class="section bg-paper" aria-labelledby="press-kit-title">
      <div class="container-page">
        <div class="card grid gap-8 p-8 md:grid-cols-3 md:items-center md:p-12">
          <div class="md:col-span-2">
            <h2 id="press-kit-title" class="font-display text-3xl text-ink">Espace presse</h2>
            <p class="mt-3 text-lg text-muted">
              Journalistes et organisateurs : demandes d’interview, photos officielles haute définition et biographie
              détaillée sont disponibles sur simple demande.
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <a [href]="'mailto:' + pressEmail" class="btn btn-dark"><app-icon name="mail" [size]="18" /> {{ pressEmail }}</a>
            <a routerLink="/contact" class="btn btn-outline-dark">Formulaire de contact</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Media {
  protected readonly profile = PROFILE;
  protected readonly press = PRESS;
  protected readonly videos = VIDEOS;
  protected readonly pressEmail = SITE.contact.pressEmail;
  protected readonly breadcrumbs: Breadcrumb[] = [{ name: 'Médias', path: '/medias' }];

  constructor() {
    inject(SeoService).update({
      title: 'Médias, presse et vidéos',
      description: `Revue de presse, interviews, vidéos et espace presse de ${PROFILE.name}. Contact médias et demandes d’interview.`,
      path: '/medias',
      breadcrumbs: this.breadcrumbs,
      schema: VIDEOS.map((video) => ({
        '@type': 'VideoObject',
        name: video.title,
        description: video.description ?? video.title,
        uploadDate: video.date,
        thumbnailUrl: `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
      })),
    });
  }
}
