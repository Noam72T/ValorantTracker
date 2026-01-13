// URLs des icônes de rangs Valorant depuis l'API officielle
export const RANK_ICONS: { [key: string]: string } = {
  'Iron 1': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/3/largeicon.png',
  'Iron 2': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/4/largeicon.png',
  'Iron 3': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/5/largeicon.png',
  'Bronze 1': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/6/largeicon.png',
  'Bronze 2': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/7/largeicon.png',
  'Bronze 3': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/8/largeicon.png',
  'Silver 1': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/9/largeicon.png',
  'Silver 2': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/10/largeicon.png',
  'Silver 3': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/11/largeicon.png',
  'Gold 1': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/12/largeicon.png',
  'Gold 2': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/13/largeicon.png',
  'Gold 3': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/14/largeicon.png',
  'Platinum 1': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/15/largeicon.png',
  'Platinum 2': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/16/largeicon.png',
  'Platinum 3': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/17/largeicon.png',
  'Diamond 1': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/18/largeicon.png',
  'Diamond 2': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/19/largeicon.png',
  'Diamond 3': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/20/largeicon.png',
  'Ascendant 1': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/largeicon.png',
  'Ascendant 2': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/22/largeicon.png',
  'Ascendant 3': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/23/largeicon.png',
  'Immortal 1': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/24/largeicon.png',
  'Immortal 2': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/25/largeicon.png',
  'Immortal 3': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/26/largeicon.png',
  'Radiant': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/27/largeicon.png',
  'Unrated': 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/0/largeicon.png',
};

export const getRankIcon = (rankName: string | null | undefined): string => {
  if (!rankName) return RANK_ICONS['Unrated'];
  return RANK_ICONS[rankName] || RANK_ICONS['Unrated'];
};

export const getRankColor = (rankName: string | null | undefined): string => {
  if (!rankName) return 'text-gray-400';
  
  const rank = rankName.toLowerCase();
  if (rank.includes('iron')) return 'text-gray-400';
  if (rank.includes('bronze')) return 'text-amber-700';
  if (rank.includes('silver')) return 'text-gray-300';
  if (rank.includes('gold')) return 'text-yellow-400';
  if (rank.includes('platinum')) return 'text-cyan-400';
  if (rank.includes('diamond')) return 'text-purple-400';
  if (rank.includes('ascendant')) return 'text-green-400';
  if (rank.includes('immortal')) return 'text-red-400';
  if (rank.includes('radiant')) return 'text-yellow-300';
  
  return 'text-gray-400';
};
