import type { ImageAsset } from '../models';

/**
 * Photos de Michelet Nestor (fichiers dans `public/images/`).
 * `width` / `height` doivent correspondre aux dimensions réelles du fichier.
 */
export const PHOTOS = {
  portraitOfficiel: {
    src: '/images/portrait-de-Mr-Nestor.webp',
    alt: 'Portrait officiel de Michelet Nestor, bras croisés, en costume bleu marine et cravate rouge',
    width: 1254,
    height: 1254,
  },
  portraitSourire: {
    src: '/images/portrait-de-Mr-Nestor-2.webp',
    alt: 'Michelet Nestor souriant, en veste bleu marine et chemise blanche',
    width: 946,
    height: 2048,
  },
  portraitBureau: {
    src: '/images/portrait-de-Mr-Nestor-3.webp',
    alt: 'Michelet Nestor dans son bureau, devant un portrait de Toussaint Louverture',
    width: 960,
    height: 959,
  },
  portraitReflexion: {
    src: '/images/portrait-de-Mr-Nestor-4.webp',
    alt: 'Michelet Nestor, pensif, la main sous le menton',
    width: 1020,
    height: 1019,
  },
  posterBureau: {
    src: '/images/poster-de-Mr-Nestor.webp',
    alt: 'Michelet Nestor debout dans son bureau',
    width: 640,
    height: 1558,
  },
  saluantLaFoule: {
    src: '/images/Mr-Nestor-saluant-la-foule.webp',
    alt: 'Michelet Nestor saluant une foule nombreuse depuis un véhicule',
    width: 1078,
    height: 1080,
  },
  saluantUnCivil: {
    src: '/images/Mr-Nestor-saluant-un-civil.webp',
    alt: 'Michelet Nestor serrant la main d’un habitant lors d’une visite de terrain',
    width: 960,
    height: 642,
  },
  emissionTv: {
    src: '/images/Mr-Nestor-emission-tv.webp',
    alt: 'Michelet Nestor sur le plateau d’une émission de télévision',
    width: 820,
    height: 820,
  },
  avecUnAmi: {
    src: '/images/Mr-Nestor-avec-un-ami.webp',
    alt: 'Michelet Nestor en tenue de soirée aux côtés d’un officier de police',
    width: 1100,
    height: 2048,
  },
  enFamille: {
    src: '/images/Mr-Nestor-et-sa-famille.webp',
    alt: 'Michelet Nestor entouré de sa famille, tous vêtus de blanc',
    width: 960,
    height: 720,
  },
} satisfies Record<string, ImageAsset>;

/** Galerie de la page Médias (ordre d'affichage). */
export const GALLERY: ImageAsset[] = [
  PHOTOS.portraitOfficiel,
  PHOTOS.saluantLaFoule,
  PHOTOS.saluantUnCivil,
  PHOTOS.emissionTv,
  PHOTOS.portraitBureau,
  PHOTOS.enFamille,
  PHOTOS.portraitSourire,
  PHOTOS.avecUnAmi,
  PHOTOS.portraitReflexion,
];
