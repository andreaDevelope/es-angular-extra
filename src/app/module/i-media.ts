export interface iMedia {
  name: string;
  size: number;
  type: 'image' | 'video';
  path: string;
  peso: number;
  attacco_base: number;
  consumo_stamina_attacco_base: number;
  attacco_speciale: number;
  consumo_stamina_attacco_speciale: number;
  stamina: number;
  vita: number;
}
