import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Breadcrumb, SeoService } from '../../core/seo/seo.service';
import { SITE } from '../../core/site.config';
import { PageHeader } from '../../shared/page-header';

/**
 * ⚖️ Modèle de mentions légales et de politique de confidentialité.
 * À faire valider selon la législation applicable dans le pays de publication.
 */
@Component({
  selector: 'app-legal',
  imports: [PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header title="Mentions légales & confidentialité" [breadcrumbs]="breadcrumbs" />

    <section class="section bg-paper">
      <div class="container-page prose-site max-w-3xl">
        <h2>Éditeur du site</h2>
        <p>
          Le site {{ site.url }} est édité par {{ site.legal.publisher }}.<br />
          Directeur de la publication : {{ site.legal.publicationDirector }}.<br />
          Contact : <a [href]="'mailto:' + site.contact.email">{{ site.contact.email }}</a>
        </p>

        <h2>Hébergement</h2>
        <p>{{ site.legal.host }}</p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus de ce site (textes, photographies, vidéos, logos) est protégé par le droit de la
          propriété intellectuelle. Toute reproduction, même partielle, sans autorisation préalable est interdite.
        </p>

        <h2 id="confidentialite">Politique de confidentialité</h2>
        <p>
          Les informations transmises via le formulaire de contact (nom, adresse e-mail, message) sont utilisées
          uniquement pour répondre à votre demande. Elles ne sont ni vendues ni cédées à des tiers et sont conservées
          pendant une durée maximale de 12 mois.
        </p>
        <p>
          Vous disposez d’un droit d’accès, de rectification et de suppression de vos données. Pour l’exercer,
          écrivez à <a [href]="'mailto:' + site.contact.email">{{ site.contact.email }}</a>.
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site n’utilise aucun cookie publicitaire ni de mesure d’audience. Les vidéos YouTube ne sont chargées
          (depuis le domaine youtube-nocookie.com) qu’après un clic de votre part.
        </p>
      </div>
    </section>
  `,
})
export class Legal {
  protected readonly site = SITE;
  protected readonly breadcrumbs: Breadcrumb[] = [
    { name: 'Mentions légales', path: '/mentions-legales' },
  ];

  constructor() {
    inject(SeoService).update({
      title: 'Mentions légales et politique de confidentialité',
      description: `Mentions légales, informations sur l’éditeur et politique de confidentialité du site officiel de ${SITE.name}.`,
      path: '/mentions-legales',
      breadcrumbs: this.breadcrumbs,
    });
  }
}
