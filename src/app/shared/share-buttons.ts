import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import { IconName } from '../core/models';
import { absoluteUrl } from '../core/seo/structured-data';
import { Icon } from './icon';

interface ShareTarget {
  label: string;
  icon: IconName;
  href: string;
}

@Component({
  selector: 'app-share-buttons',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <span class="text-sm font-semibold text-ink">Partager :</span>
      @for (target of targets(); track target.label) {
        <a
          [href]="target.href"
          target="_blank"
          rel="noopener noreferrer"
          class="icon-button"
          [attr.aria-label]="'Partager sur ' + target.label"
          [title]="'Partager sur ' + target.label"
        >
          <app-icon [name]="target.icon" [size]="18" />
        </a>
      }
      <button
        type="button"
        class="icon-button"
        (click)="copy()"
        [attr.aria-label]="copied() ? 'Lien copié' : 'Copier le lien'"
        [title]="copied() ? 'Lien copié' : 'Copier le lien'"
      >
        <app-icon [name]="copied() ? 'check' : 'link'" [size]="18" />
      </button>
      <span class="sr-only" aria-live="polite">{{ copied() ? 'Lien copié dans le presse-papiers' : '' }}</span>
    </div>
  `,
})
export class ShareButtons {
  readonly path = input.required<string>();
  readonly title = input.required<string>();

  protected readonly copied = signal(false);

  private readonly url = computed(() => absoluteUrl(this.path()));

  protected readonly targets = computed<ShareTarget[]>(() => {
    const url = encodeURIComponent(this.url());
    const text = encodeURIComponent(this.title());
    return [
      { label: 'Facebook', icon: 'facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
      { label: 'X', icon: 'x', href: `https://x.com/intent/post?url=${url}&text=${text}` },
      { label: 'WhatsApp', icon: 'whatsapp', href: `https://wa.me/?text=${text}%20${url}` },
      { label: 'LinkedIn', icon: 'linkedin', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    ];
  });

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.url());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    } catch {
      // Presse-papiers indisponible (contexte non sécurisé) : on ne fait rien.
    }
  }
}
