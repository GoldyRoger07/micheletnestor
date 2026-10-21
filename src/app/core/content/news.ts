import type { NewsArticle } from '../models';

/**
 * ✏️ ARTICLES D'EXEMPLE — à remplacer.
 * - `slug` : unique, en minuscules, sans accents ni espaces (il devient l'URL /actualites/<slug>).
 * - `date` : format AAAA-MM-JJ. Les articles sont triés automatiquement du plus récent au plus ancien.
 * - Chaque nouvel article est automatiquement pré-rendu et ajouté au sitemap au prochain build.
 */
const ARTICLES: NewsArticle[] = [
  {
    slug: 'lancement-programme-bourses-jeunesse',
    title: 'Lancement d’un programme de bourses pour la jeunesse',
    excerpt:
      'Michelet Nestor annonce un nouveau programme destiné à accompagner les jeunes talents dans leurs études et leurs projets.',
    date: '2026-09-02',
    category: 'Annonce',
    image: {
      src: '/images/Mr-Nestor-saluant-la-foule.webp',
      alt: 'Michelet Nestor saluant une foule nombreuse depuis un véhicule',
      width: 1078,
      height: 1080,
    },
    body: [
      'Michelet Nestor a présenté un programme de bourses destiné à soutenir les jeunes dans la poursuite de leurs études et la concrétisation de leurs projets.',
      '## Un programme ouvert à tous',
      'Le dispositif s’adresse aux étudiants et aux jeunes porteurs de projets, sélectionnés sur la base de leur motivation et de leur potentiel. Il combine un soutien financier et un accompagnement personnalisé.',
      '« Investir dans la jeunesse, c’est investir dans l’avenir de toute la communauté », a déclaré Michelet Nestor lors de la présentation.',
      '## Les prochaines étapes',
      'Les modalités de candidature seront publiées prochainement sur ce site et sur les réseaux sociaux officiels.',
    ],
  },
  {
    slug: 'rencontre-citoyenne-developpement-local',
    title: 'Rencontre citoyenne autour du développement local',
    excerpt:
      'Une journée d’échanges avec les habitants, les associations et les acteurs économiques pour construire des projets concrets.',
    date: '2026-07-15',
    category: 'Terrain',
    image: {
      src: '/images/Mr-Nestor-saluant-un-civil.webp',
      alt: 'Michelet Nestor serrant la main d’un habitant lors d’une rencontre citoyenne',
      width: 960,
      height: 642,
    },
    body: [
      'Michelet Nestor est allé à la rencontre des habitants lors d’une journée consacrée au développement local.',
      'Associations, commerçants et citoyens ont pu partager leurs attentes et leurs idées autour de trois thèmes : l’emploi, les infrastructures et la vie culturelle.',
      '## Des propositions concrètes',
      'Les contributions recueillies alimenteront une feuille de route qui sera présentée publiquement dans les prochains mois.',
    ],
  },
  {
    slug: 'intervention-conference-education',
    title: 'Intervention lors d’une conférence sur l’éducation',
    excerpt:
      'Invité à s’exprimer sur l’avenir de l’éducation, Michelet Nestor a plaidé pour un accès équitable au savoir.',
    date: '2026-05-28',
    category: 'Conférence',
    image: {
      src: '/images/Mr-Nestor-emission-tv.webp',
      alt: 'Michelet Nestor lors d’une prise de parole sur un plateau de télévision',
      width: 820,
      height: 820,
    },
    body: [
      'Lors d’une conférence réunissant enseignants, chercheurs et décideurs, Michelet Nestor a présenté sa vision d’une éducation accessible à tous.',
      '## Trois priorités',
      'Il a notamment insisté sur la formation des enseignants, l’équipement numérique des établissements et le soutien aux élèves en difficulté.',
      'La vidéo de l’intervention sera prochainement disponible dans la rubrique Médias.',
    ],
  },
];

export const NEWS: NewsArticle[] = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

export function findArticle(slug: string): NewsArticle | undefined {
  return NEWS.find((article) => article.slug === slug);
}
