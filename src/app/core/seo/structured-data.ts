import { PROFILE } from '../content/profile';
import { NewsArticle } from '../models';
import { SITE } from '../site.config';

/** Transforme un chemin relatif en URL absolue de production. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized === '/' ? `${SITE.url}/` : `${SITE.url}${normalized}`;
}

export const PERSON_ID = `${SITE.url}/#person`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export type JsonLd = Record<string, unknown>;

export function personSchema(): JsonLd {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PROFILE.name,
    givenName: PROFILE.givenName,
    familyName: PROFILE.familyName,
    jobTitle: PROFILE.jobTitle,
    description: PROFILE.summary,
    url: absoluteUrl('/'),
    image: absoluteUrl(PROFILE.portrait.src),
    ...(PROFILE.nationality && { nationality: PROFILE.nationality }),
    ...(PROFILE.birthPlace && { birthPlace: PROFILE.birthPlace }),
    knowsAbout: PROFILE.knowsAbout,
    sameAs: SITE.socials.map((social) => social.url),
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: SITE.name,
    inLanguage: SITE.language,
    publisher: { '@id': PERSON_ID },
    about: { '@id': PERSON_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function profilePageSchema(path: string): JsonLd {
  return {
    '@type': 'ProfilePage',
    url: absoluteUrl(path),
    mainEntity: { '@id': PERSON_ID },
    inLanguage: SITE.language,
  };
}

export function articleSchema(article: NewsArticle): JsonLd {
  const url = absoluteUrl(`/actualites/${article.slug}`);
  return {
    '@type': 'NewsArticle',
    '@id': `${url}#article`,
    mainEntityOfPage: url,
    headline: article.title,
    description: article.excerpt,
    image: [absoluteUrl(article.image.src)],
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    articleSection: article.category,
    inLanguage: SITE.language,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    about: { '@id': PERSON_ID },
  };
}
