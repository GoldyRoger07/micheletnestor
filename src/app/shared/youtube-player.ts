import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Icon } from './icon';

/**
 * Lecteur YouTube « façade » : n'affiche qu'une miniature tant que l'utilisateur n'a pas cliqué.
 * Évite de charger ~1 Mo de scripts YouTube par vidéo (Core Web Vitals) et les cookies tiers.
 */
@Component({
  selector: 'app-youtube-player',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="relative aspect-video overflow-hidden rounded-2xl bg-ink shadow-lg">
      @if (playing()) {
        <iframe
          class="absolute inset-0 h-full w-full"
          [src]="embedUrl()"
          [title]="title()"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      } @else {
        <button
          type="button"
          class="group absolute inset-0 h-full w-full"
          (click)="playing.set(true)"
          [attr.aria-label]="'Lire la vidéo : ' + title()"
        >
          <img
            [src]="thumbnail()"
            [alt]="''"
            loading="lazy"
            decoding="async"
            width="480"
            height="360"
            class="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          <span
            class="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-500 text-ink shadow-xl transition group-hover:scale-110"
          >
            <app-icon name="play" [size]="26" />
          </span>
        </button>
      }
    </div>
  `,
})
export class YoutubePlayer {
  private readonly sanitizer = inject(DomSanitizer);

  readonly videoId = input.required<string>();
  readonly title = input.required<string>();

  protected readonly playing = signal(false);

  protected readonly thumbnail = computed(
    () => `https://i.ytimg.com/vi/${encodeURIComponent(this.videoId())}/hqdefault.jpg`,
  );

  protected readonly embedUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId())}?autoplay=1&rel=0`,
    ),
  );
}
