import type { PressItem, VideoItem } from '../models';

/**
 * ✏️ RETOMBÉES PRESSE D'EXEMPLE — à remplacer.
 * `url` est optionnel : sans URL, l'élément s'affiche sans lien.
 */
export const PRESS: PressItem[] = [
  {
    title: 'Portrait : un engagement au service de la communauté',
    outlet: 'Nom du média',
    date: '2026-08-20',
    type: 'Article',
  },
  {
    title: 'Entretien sur les priorités pour la jeunesse',
    outlet: 'Nom de la radio',
    date: '2026-06-10',
    type: 'Interview',
  },
  {
    title: 'Tribune : « L’éducation, première des urgences »',
    outlet: 'Nom du journal',
    date: '2026-04-02',
    type: 'Tribune',
  },
];

/**
 * Vidéos YouTube. Renseigner uniquement l'identifiant (la partie après `v=` dans l'URL).
 * Exemple : { title: 'Discours…', youtubeId: 'dQw4w9WgXcQ', date: '2026-05-28' }
 * La section Vidéos est masquée tant que la liste est vide.
 */
export const VIDEOS: VideoItem[] = [];
