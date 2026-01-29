// Base de données de skins Valorant pour la boutique quotidienne
export interface WeaponSkin {
  id: string;
  name: string;
  weapon: string;
  collection: string;
  rarity: 'Select' | 'Deluxe' | 'Premium' | 'Ultra' | 'Exclusive';
  price: number;
  image: string;
  video?: string;
}

export const WEAPON_SKINS: WeaponSkin[] = [
  // Collection Prime
  {
    id: 'prime-vandal',
    name: 'Prime Vandal',
    weapon: 'Vandal',
    collection: 'Prime',
    rarity: 'Exclusive',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/8e4a2a84-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'prime-phantom',
    name: 'Prime Phantom',
    weapon: 'Phantom',
    collection: 'Prime',
    rarity: 'Exclusive',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/4d4b6e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'prime-classic',
    name: 'Prime Classic',
    weapon: 'Classic',
    collection: 'Prime',
    rarity: 'Exclusive',
    price: 875,
    image: 'https://media.valorant-api.com/weaponskins/2f3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'prime-spectre',
    name: 'Prime Spectre 2.0',
    weapon: 'Spectre',
    collection: 'Prime',
    rarity: 'Exclusive',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/b7c7b1a3-4797-ddee-d0ad-4c9053eba88a/displayicon.png'
  },

  // Collection Reaver
  {
    id: 'reaver-vandal',
    name: 'Reaver Vandal',
    weapon: 'Vandal',
    collection: 'Reaver',
    rarity: 'Premium',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/5305d9c4-4f46-fbf4-9e9c-87b8eb0d8e12/displayicon.png'
  },
  {
    id: 'reaver-operator',
    name: 'Reaver Operator',
    weapon: 'Operator',
    collection: 'Reaver',
    rarity: 'Premium',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/b0a6d3b5-4f46-fbf4-9e9c-87b8eb0d8e12/displayicon.png'
  },
  {
    id: 'reaver-sheriff',
    name: 'Reaver Sheriff',
    weapon: 'Sheriff',
    collection: 'Reaver',
    rarity: 'Premium',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/c4c0c3b5-4f46-fbf4-9e9c-87b8eb0d8e12/displayicon.png'
  },

  // Collection Elderflame
  {
    id: 'elderflame-vandal',
    name: 'Elderflame Vandal',
    weapon: 'Vandal',
    collection: 'Elderflame',
    rarity: 'Ultra',
    price: 2475,
    image: 'https://media.valorant-api.com/weaponskins/7a7b3b5a-4f46-fbf4-9e9c-87b8eb0d8e12/displayicon.png'
  },
  {
    id: 'elderflame-operator',
    name: 'Elderflame Operator',
    weapon: 'Operator',
    collection: 'Elderflame',
    rarity: 'Ultra',
    price: 2475,
    image: 'https://media.valorant-api.com/weaponskins/8a8b3b5a-4f46-fbf4-9e9c-87b8eb0d8e12/displayicon.png'
  },
  {
    id: 'elderflame-frenzy',
    name: 'Elderflame Frenzy',
    weapon: 'Frenzy',
    collection: 'Elderflame',
    rarity: 'Ultra',
    price: 2475,
    image: 'https://media.valorant-api.com/weaponskins/9a9b3b5a-4f46-fbf4-9e9c-87b8eb0d8e12/displayicon.png'
  },

  // Collection Glitchpop
  {
    id: 'glitchpop-vandal',
    name: 'Glitchpop Vandal',
    weapon: 'Vandal',
    collection: 'Glitchpop',
    rarity: 'Premium',
    price: 2175,
    image: 'https://media.valorant-api.com/weaponskins/1f3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'glitchpop-phantom',
    name: 'Glitchpop Phantom',
    weapon: 'Phantom',
    collection: 'Glitchpop',
    rarity: 'Premium',
    price: 2175,
    image: 'https://media.valorant-api.com/weaponskins/2f3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'glitchpop-odin',
    name: 'Glitchpop Odin',
    weapon: 'Odin',
    collection: 'Glitchpop',
    rarity: 'Premium',
    price: 2175,
    image: 'https://media.valorant-api.com/weaponskins/3f3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },

  // Collection Sovereign
  {
    id: 'sovereign-ghost',
    name: 'Sovereign Ghost',
    weapon: 'Ghost',
    collection: 'Sovereign',
    rarity: 'Premium',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/4f3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'sovereign-guardian',
    name: 'Sovereign Guardian',
    weapon: 'Guardian',
    collection: 'Sovereign',
    rarity: 'Premium',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/5f3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },

  // Collection Ion
  {
    id: 'ion-phantom',
    name: 'Ion Phantom',
    weapon: 'Phantom',
    collection: 'Ion',
    rarity: 'Premium',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/6f3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'ion-sheriff',
    name: 'Ion Sheriff',
    weapon: 'Sheriff',
    collection: 'Ion',
    rarity: 'Premium',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/7f3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },

  // Collection Oni
  {
    id: 'oni-phantom',
    name: 'Oni Phantom',
    weapon: 'Phantom',
    collection: 'Oni',
    rarity: 'Premium',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/8f3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'oni-shorty',
    name: 'Oni Shorty',
    weapon: 'Shorty',
    collection: 'Oni',
    rarity: 'Premium',
    price: 1775,
    image: 'https://media.valorant-api.com/weaponskins/9f3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },

  // Collection Singularity
  {
    id: 'singularity-phantom',
    name: 'Singularity Phantom',
    weapon: 'Phantom',
    collection: 'Singularity',
    rarity: 'Premium',
    price: 2175,
    image: 'https://media.valorant-api.com/weaponskins/af3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'singularity-spectre',
    name: 'Singularity Spectre',
    weapon: 'Spectre',
    collection: 'Singularity',
    rarity: 'Premium',
    price: 2175,
    image: 'https://media.valorant-api.com/weaponskins/bf3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },

  // Collection Spectrum
  {
    id: 'spectrum-phantom',
    name: 'Spectrum Phantom',
    weapon: 'Phantom',
    collection: 'Spectrum',
    rarity: 'Ultra',
    price: 2675,
    image: 'https://media.valorant-api.com/weaponskins/cf3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'spectrum-classic',
    name: 'Spectrum Classic',
    weapon: 'Classic',
    collection: 'Spectrum',
    rarity: 'Ultra',
    price: 2675,
    image: 'https://media.valorant-api.com/weaponskins/df3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },

  // Skins Deluxe
  {
    id: 'sakura-vandal',
    name: 'Sakura Vandal',
    weapon: 'Vandal',
    collection: 'Sakura',
    rarity: 'Deluxe',
    price: 1275,
    image: 'https://media.valorant-api.com/weaponskins/ef3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'sakura-sheriff',
    name: 'Sakura Sheriff',
    weapon: 'Sheriff',
    collection: 'Sakura',
    rarity: 'Deluxe',
    price: 1275,
    image: 'https://media.valorant-api.com/weaponskins/ff3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },

  // Skins Select
  {
    id: 'wasteland-vandal',
    name: 'Wasteland Vandal',
    weapon: 'Vandal',
    collection: 'Wasteland',
    rarity: 'Select',
    price: 875,
    image: 'https://media.valorant-api.com/weaponskins/0a3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'wasteland-phantom',
    name: 'Wasteland Phantom',
    weapon: 'Phantom',
    collection: 'Wasteland',
    rarity: 'Select',
    price: 875,
    image: 'https://media.valorant-api.com/weaponskins/1a3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },

  // Collection RGX
  {
    id: 'rgx-vandal',
    name: 'RGX 11z Pro Vandal',
    weapon: 'Vandal',
    collection: 'RGX 11z Pro',
    rarity: 'Premium',
    price: 2175,
    image: 'https://media.valorant-api.com/weaponskins/2a3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'rgx-guardian',
    name: 'RGX 11z Pro Guardian',
    weapon: 'Guardian',
    collection: 'RGX 11z Pro',
    rarity: 'Premium',
    price: 2175,
    image: 'https://media.valorant-api.com/weaponskins/3a3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },

  // Collection Protocol 781-A
  {
    id: 'protocol-phantom',
    name: 'Protocol 781-A Phantom',
    weapon: 'Phantom',
    collection: 'Protocol 781-A',
    rarity: 'Premium',
    price: 2475,
    image: 'https://media.valorant-api.com/weaponskins/4a3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },
  {
    id: 'protocol-spectre',
    name: 'Protocol 781-A Spectre',
    weapon: 'Spectre',
    collection: 'Protocol 781-A',
    rarity: 'Premium',
    price: 2475,
    image: 'https://media.valorant-api.com/weaponskins/5a3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  },

  // Collection Sentinels of Light
  {
    id: 'sentinels-vandal',
    name: 'Sentinels of Light Vandal',
    weapon: 'Vandal',
    collection: 'Sentinels of Light',
    rarity: 'Premium',
    price: 2175,
    image: 'https://media.valorant-api.com/weaponskins/b7c7b1a3-4797-ddee-d0ad-4c9053eba88a/displayicon.png'
  },
  {
    id: 'sentinels-operator',
    name: 'Sentinels of Light Operator',
    weapon: 'Operator',
    collection: 'Sentinels of Light',
    rarity: 'Premium',
    price: 2175,
    image: 'https://media.valorant-api.com/weaponskins/6a3b4e4a-4c04-d3b5-7c95-e8b1d1a6b5e6/displayicon.png'
  }
];

// Fonction pour obtenir la boutique du jour
export const getDailyShop = (): WeaponSkin[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const seed = today.getTime();
  
  // Utiliser la date comme seed pour un random déterministe
  const seededRandom = (s: number) => {
    const x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
  };
  
  // Mélanger le tableau avec le seed du jour
  const shuffled = [...WEAPON_SKINS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Retourner 4 skins pour la boutique quotidienne
  return shuffled.slice(0, 4);
};

// Fonction pour obtenir le temps restant avant le reset
export const getTimeUntilReset = (): { hours: number; minutes: number; seconds: number } => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
};
