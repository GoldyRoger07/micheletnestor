import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { ImageAsset } from '../models';
import { SITE } from '../site.config';
import {
  JsonLd,
  absoluteUrl,
  breadcrumbSchema,
  personSchema,
  websiteSchema,
} from './structured-data';

export interface Breadcrumb {
  name: string;
  path: string;
}

export interface PageSeo {
  /** Titre de la page, sans le nom du site (ajouté automatiquement). */
  title: string;
  /** 120–160 caractères idéalement. */
  description: string;
  /** Chemin canonique, ex. `/biographie`. */
  path: string;
  image?: ImageAsset;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  /** Exclut la page de l'index (404, pages techniques…). */
  noindex?: boolean;
  /** Fil d'Ariane (hors accueil, ajouté automatiquement). */
  breadcrumbs?: Breadcrumb[];
  /** Nœuds JSON-LD spécifiques à la page, fusionnés dans le @graph global. */
  schema?: JsonLd[];
}

const JSON_LD_ID = 'seo-structured-data';

/**
 * Centralise le SEO on-page : title, meta description, robots, URL canonique,
 * Open Graph, Twitter Cards et données structurées JSON-LD (schema.org).
 * Fonctionne côté serveur (pré-rendu/SSR) et côté navigateur (navigation client).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(page: PageSeo): void {
    const isHome = page.path === '/';
    const fullTitle = isHome ? page.title : `${page.title} | ${SITE.name}`;
    const url = absoluteUrl(page.path);
    // Les réseaux sociaux n'affichent pas les SVG : on retombe alors sur l'image par défaut.
    const image = page.image && !page.image.src.endsWith('.svg') ? page.image : SITE.defaultImage;
    const imageUrl = absoluteUrl(image.src);
    const type = page.type ?? 'website';

    this.title.setTitle(fullTitle);
    this.setName('description', page.description);
    this.setName(
      'robots',
      page.noindex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );
    this.setCanonical(url);

    // Open Graph
    this.setProperty('og:type', type);
    this.setProperty('og:site_name', SITE.name);
    this.setProperty('og:locale', SITE.locale);
    this.setProperty('og:title', fullTitle);
    this.setProperty('og:description', page.description);
    this.setProperty('og:url', url);
    this.setProperty('og:image', imageUrl);
    this.setProperty('og:image:alt', image.alt);
    this.setProperty('og:image:width', String(image.width));
    this.setProperty('og:image:height', String(image.height));
    this.setOptionalProperty('article:published_time', type === 'article' ? page.publishedTime : undefined);
    this.setOptionalProperty('article:modified_time', type === 'article' ? page.modifiedTime : undefined);

    // Twitter / X
    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', fullTitle);
    this.setName('twitter:description', page.description);
    this.setName('twitter:image', imageUrl);
    this.setName('twitter:image:alt', image.alt);
    if (SITE.twitterHandle) {
      this.setName('twitter:site', `@${SITE.twitterHandle}`);
    }

    // Données structurées
    const graph: JsonLd[] = [personSchema(), websiteSchema(), ...(page.schema ?? [])];
    if (!isHome && page.breadcrumbs?.length) {
      graph.push(breadcrumbSchema([{ name: 'Accueil', path: '/' }, ...page.breadcrumbs]));
    }
    this.setJsonLd({ '@context': 'https://schema.org', '@graph': graph });
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content }, `name="${name}"`);
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property="${property}"`);
  }

  private setOptionalProperty(property: string, content: string | undefined): void {
    if (content) {
      this.setProperty(property, content);
    } else {
      this.meta.removeTag(`property="${property}"`);
    }
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data: JsonLd): void {
    const head = this.document.head;
    let script = head.querySelector<HTMLScriptElement>(`script#${JSON_LD_ID}`);
    if (!script) {
      script = this.document.createElement('script');
      script.id = JSON_LD_ID;
      script.type = 'application/ld+json';
      head.appendChild(script);
    }
    // Échappe « < » pour empêcher toute fermeture prématurée de la balise <script>.
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  }
}
