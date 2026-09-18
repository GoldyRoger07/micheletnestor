import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

import { NAV_LINKS, SITE } from '../core/site.config';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'close()',
  },
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      [class.header-solid]="scrolled() || open()"
    >
      <div class="container-page flex h-18 items-center justify-between gap-6">
        <a routerLink="/" class="group flex items-center gap-3" aria-label="Michelet Nestor — accueil">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/60 font-display text-lg text-gold-300 transition group-hover:bg-gold-500 group-hover:text-ink"
            aria-hidden="true"
            >MN</span
          >
          <span class="font-display text-xl tracking-wide text-paper">{{ siteName }}</span>
        </a>

        <nav aria-label="Navigation principale" class="hidden lg:block">
          <ul class="flex items-center gap-1">
            @for (link of links; track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  routerLinkActive="nav-active"
                  ariaCurrentWhenActive="page"
                  [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                  class="nav-link"
                  >{{ link.label }}</a
                >
              </li>
            }
          </ul>
        </nav>

        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full text-paper hover:bg-white/10 lg:hidden"
          (click)="toggle()"
          [attr.aria-expanded]="open()"
          aria-controls="mobile-menu"
          [attr.aria-label]="open() ? 'Fermer le menu' : 'Ouvrir le menu'"
        >
          <app-icon [name]="open() ? 'close' : 'menu'" [size]="24" />
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Navigation mobile"
        class="mobile-menu lg:hidden"
        [class.mobile-menu-open]="open()"
        [attr.inert]="open() ? null : ''"
      >
        <ul class="container-page flex flex-col gap-1 pb-8 pt-2">
          @for (link of links; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="text-gold-300!"
                ariaCurrentWhenActive="page"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                class="block border-b border-white/10 py-4 font-display text-2xl text-paper"
                >{{ link.label }}</a
              >
            </li>
          }
        </ul>
      </nav>
    </header>
  `,
})
export class SiteHeader {
  private readonly document = inject(DOCUMENT);

  protected readonly links = NAV_LINKS;
  protected readonly siteName = SITE.name;
  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);

  constructor() {
    const subscription = inject(Router)
      .events.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.close());
    inject(DestroyRef).onDestroy(() => subscription.unsubscribe());

    // Bloque le défilement de la page quand le menu mobile est ouvert.
    effect(() => {
      this.document.body.classList.toggle('overflow-hidden', this.open());
    });
  }

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected onScroll(): void {
    const scrolled = (this.document.defaultView?.scrollY ?? 0) > 16;
    if (scrolled !== this.scrolled()) {
      this.scrolled.set(scrolled);
    }
  }
}
