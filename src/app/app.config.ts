import { provideHttpClient, withFetch } from '@angular/common/http';
import { IMAGE_LOADER, ImageLoaderConfig, PlatformLocation, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {
  ApplicationConfig,
  LOCALE_ID,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'fr' },
    // Préfixe les images locales (`/images/…`) par le <base href> : le site fonctionne ainsi
    // aussi bien à la racine d'un domaine que dans un sous-dossier (aperçu GitHub Pages).
    {
      provide: IMAGE_LOADER,
      useFactory: () => {
        const base = (inject(PlatformLocation).getBaseHrefFromDOM() ?? '/').replace(/\/$/, '');
        return ({ src }: ImageLoaderConfig) => (src.startsWith('/') ? base + src : src);
      },
    },
  ],
};
