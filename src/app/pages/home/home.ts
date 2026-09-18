import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NEWS } from '../../core/content/news';
import { ENGAGEMENTS, PROFILE } from '../../core/content/profile';
import { SeoService } from '../../core/seo/seo.service';
import { PERSON_ID } from '../../core/seo/structured-data';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';
import { NewsCard } from '../../shared/news-card';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, RouterLink, Icon, NewsCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class Home {
  protected readonly profile = PROFILE;
  protected readonly engagements = ENGAGEMENTS.slice(0, 3);
  protected readonly latestNews = NEWS.slice(0, 3);
  protected readonly site = SITE;

  constructor() {
    inject(SeoService).update({
      title: `${PROFILE.name} — ${PROFILE.jobTitle} | Site officiel`,
      description: PROFILE.summary,
      path: '/',
      type: 'profile',
      schema: [
        {
          '@type': 'WebPage',
          url: `${SITE.url}/`,
          name: `${PROFILE.name} — Site officiel`,
          about: { '@id': PERSON_ID },
          primaryImageOfPage: `${SITE.url}${PROFILE.portrait.src}`,
          inLanguage: SITE.language,
        },
      ],
    });
  }
}
