import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a href="#contenu" class="skip-link">Aller au contenu principal</a>
    <app-site-header />
    <main id="contenu" tabindex="-1" class="outline-none">
      <router-outlet />
    </main>
    <app-site-footer />
  `,
})
export class App {}
