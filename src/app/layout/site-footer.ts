import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROFILE } from '../core/content/profile';
import { NAV_LINKS, SITE } from '../core/site.config';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-ink text-paper/80">
      <div class="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-2">
          <p class="font-display text-2xl text-paper">{{ site.name }}</p>
          <p class="mt-4 max-w-md">{{ profile.tagline }}</p>
          <ul class="mt-6 flex gap-3" aria-label="Réseaux sociaux">
            @for (social of site.socials; track social.network) {
              <li>
                <a
                  [href]="social.url"
                  target="_blank"
                  rel="noopener noreferrer me"
                  class="icon-button icon-button-dark"
                  [attr.aria-label]="social.label + ' (nouvel onglet)'"
                >
                  <app-icon [name]="social.network" [size]="18" />
                </a>
              </li>
            }
          </ul>
        </div>

        <nav aria-label="Plan du site">
          <p class="eyebrow text-gold-300">Navigation</p>
          <ul class="mt-4 space-y-2">
            @for (link of links; track link.path) {
              <li><a [routerLink]="link.path" class="hover:text-gold-300">{{ link.label }}</a></li>
            }
          </ul>
        </nav>

        <div>
          <p class="eyebrow text-gold-300">Contact</p>
          <ul class="mt-4 space-y-3">
            <li>
              <a [href]="'mailto:' + site.contact.email" class="inline-flex items-center gap-2 break-all hover:text-gold-300">
                <app-icon name="mail" [size]="16" /> {{ site.contact.email }}
              </a>
            </li>
            @if (site.contact.phone) {
              <li>
                <a [href]="'tel:' + site.contact.phone" class="inline-flex items-center gap-2 hover:text-gold-300">
                  <app-icon name="phone" [size]="16" /> {{ site.contact.phone }}
                </a>
              </li>
            }
            <li>
              <a routerLink="/contact" class="inline-flex items-center gap-2 hover:text-gold-300">
                <app-icon name="megaphone" [size]="16" /> Demandes presse
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10">
        <div class="container-page flex flex-col gap-3 py-6 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {{ year }} {{ site.name }}. Tous droits réservés.</p>
          <a routerLink="/mentions-legales" class="hover:text-gold-300">Mentions légales & confidentialité</a>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooter {
  protected readonly site = SITE;
  protected readonly profile = PROFILE;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
}
