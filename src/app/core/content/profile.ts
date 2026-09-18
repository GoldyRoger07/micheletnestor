import type { Engagement, Profile } from '../models';

/**
 * ✏️ CONTENU D'EXEMPLE — à remplacer par les informations réelles de Michelet Nestor.
 * Les textes ci-dessous servent de gabarit (longueur, ton, structure) : aucune date ni
 * fonction n'a été vérifiée. Relire chaque champ avant la mise en ligne.
 */
export const PROFILE: Profile = {
  name: 'Michelet Nestor',
  givenName: 'Michelet',
  familyName: 'Nestor',
  jobTitle: 'Personnalité publique',
  tagline: 'Servir, rassembler et bâtir un avenir commun.',
  summary:
    'Site officiel de Michelet Nestor : biographie, parcours, engagements, actualités et contact presse.',
  shortBio: [
    'Michelet Nestor est une personnalité publique reconnue pour son engagement au service de la communauté et sa capacité à rassembler autour de projets concrets.',
    'Au fil de son parcours, il a porté des initiatives en faveur de l’éducation, de la jeunesse et du développement local, en plaçant le dialogue et la proximité au cœur de son action.',
  ],
  longBio: [
    'Michelet Nestor a grandi au contact d’une communauté qui lui a transmis le sens du collectif et le goût de l’effort. Très tôt, il s’investit dans la vie associative et découvre la force de l’action de terrain.',
    'Après des études qui l’ont formé à l’analyse et à la gestion de projets, il met ses compétences au service d’initiatives locales, puis d’organisations d’envergure plus large, où il se distingue par sa rigueur et son écoute.',
    '## Une vision fondée sur l’action',
    'Pour Michelet Nestor, l’engagement public se mesure aux résultats. Il privilégie les projets concrets, co-construits avec les citoyens, et défend une approche fondée sur la transparence et la responsabilité.',
    'Ses prises de parole régulières dans les médias et lors de conférences abordent les grands enjeux de société : l’éducation, l’emploi des jeunes, la cohésion sociale et le développement durable.',
    '## Aujourd’hui',
    'Aujourd’hui, Michelet Nestor poursuit son action avec la même conviction : créer des opportunités, faire émerger de nouveaux talents et contribuer à une société plus juste et plus solidaire.',
  ],
  portrait: {
    src: '/images/portrait.svg',
    alt: 'Portrait de Michelet Nestor',
    width: 800,
    height: 1000,
  },
  knowsAbout: ['Engagement citoyen', 'Éducation', 'Jeunesse', 'Développement local'],
  quote: {
    text: 'Le véritable leadership consiste à ouvrir des portes pour que d’autres puissent les franchir.',
    context: 'Michelet Nestor',
  },
  keyFigures: [
    { value: '15+', label: 'années d’engagement' },
    { value: '40', label: 'projets accompagnés' },
    { value: '10 000', label: 'personnes rencontrées' },
    { value: '25', label: 'partenaires associatifs' },
  ],
  values: [
    {
      title: 'Intégrité',
      text: 'Agir avec transparence et rendre compte de chaque engagement pris.',
      icon: 'scale',
    },
    {
      title: 'Proximité',
      text: 'Aller à la rencontre des citoyens, écouter avant de décider.',
      icon: 'users',
    },
    {
      title: 'Excellence',
      text: 'Viser l’exigence dans chaque projet, au service de l’intérêt général.',
      icon: 'award',
    },
  ],
  timeline: [
    {
      period: '20XX – aujourd’hui',
      title: 'Fonction actuelle',
      organization: 'Organisation',
      description: 'Décrire ici le rôle actuel, ses responsabilités et les principaux résultats obtenus.',
    },
    {
      period: '20XX – 20XX',
      title: 'Fonction précédente',
      organization: 'Organisation',
      description: 'Décrire une étape marquante du parcours et ce qu’elle a permis d’accomplir.',
    },
    {
      period: '20XX – 20XX',
      title: 'Premiers engagements',
      organization: 'Association',
      description: 'Présenter les premiers engagements associatifs ou professionnels.',
    },
    {
      period: '20XX',
      title: 'Formation',
      organization: 'Établissement',
      description: 'Indiquer le diplôme obtenu et le domaine d’études.',
    },
  ],
};

export const ENGAGEMENTS: Engagement[] = [
  {
    id: 'education',
    title: 'Éducation',
    summary:
      'Garantir à chaque enfant l’accès à une éducation de qualité, clé de l’égalité des chances.',
    points: [
      'Soutien aux écoles et aux enseignants',
      'Programmes de bourses et de tutorat',
      'Accès au numérique pour tous les élèves',
    ],
    icon: 'book',
  },
  {
    id: 'jeunesse',
    title: 'Jeunesse & emploi',
    summary:
      'Donner aux jeunes les moyens de réaliser leurs ambitions et de construire leur avenir.',
    points: [
      'Accompagnement des jeunes entrepreneurs',
      'Stages et parrainage professionnel',
      'Soutien aux initiatives culturelles et sportives',
    ],
    icon: 'briefcase',
  },
  {
    id: 'solidarite',
    title: 'Solidarité',
    summary:
      'Renforcer la cohésion sociale et soutenir les personnes et les familles les plus vulnérables.',
    points: [
      'Partenariats avec les associations locales',
      'Actions d’aide d’urgence',
      'Accès aux soins et aux services essentiels',
    ],
    icon: 'heart',
  },
  {
    id: 'developpement',
    title: 'Développement durable',
    summary:
      'Promouvoir un développement respectueux de l’environnement et porteur d’emplois locaux.',
    points: [
      'Projets agricoles et circuits courts',
      'Protection des ressources naturelles',
      'Infrastructures communautaires durables',
    ],
    icon: 'sprout',
  },
];
