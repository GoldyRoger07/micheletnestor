import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { SITE } from '../site.config';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let seo: SeoService;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    seo = TestBed.inject(SeoService);
    doc = TestBed.inject(DOCUMENT);
  });

  const meta = (selector: string) => doc.head.querySelector(`meta[${selector}]`)?.getAttribute('content');

  it('sets title, description, canonical and Open Graph tags', () => {
    seo.update({ title: 'Biographie', description: 'Desc', path: '/biographie' });

    expect(TestBed.inject(Title).getTitle()).toBe(`Biographie | ${SITE.name}`);
    expect(meta('name="description"')).toBe('Desc');
    expect(meta('property="og:url"')).toBe(`${SITE.url}/biographie`);
    expect(meta('property="og:image"')).toBe(`${SITE.url}${SITE.defaultImage.src}`);
    expect(doc.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${SITE.url}/biographie`,
    );
  });

  it('keeps a single canonical and JSON-LD script across navigations', () => {
    seo.update({ title: 'A', description: 'A', path: '/a' });
    seo.update({
      title: 'B',
      description: 'B',
      path: '/b',
      breadcrumbs: [{ name: 'B', path: '/b' }],
    });

    expect(doc.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    const scripts = doc.head.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBe(1);
    const graph = JSON.parse(scripts[0].textContent ?? '{}')['@graph'] as { '@type': string }[];
    expect(graph.map((node) => node['@type'])).toEqual(['Person', 'WebSite', 'BreadcrumbList']);
  });

  it('marks pages as noindex when requested', () => {
    seo.update({ title: '404', description: 'x', path: '/x', noindex: true });
    expect(meta('name="robots"')).toBe('noindex, follow');
  });
});
