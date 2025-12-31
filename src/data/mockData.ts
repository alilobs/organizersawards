export interface Organizer {
  id: string;
  name: string;
  logo: string;
  description: string;
  region: string;
  website?: string;
}

export interface Category {
  id: string;
  name: string;
  shortName: string;
  description: string;
  isMain?: boolean;
}

export const categories: Category[] = [
  {
    id: "best-organizer-2025",
    name: "Best Organizer of 2025",
    shortName: "Best Overall",
    description: "Vote for the best esports tournament organizer of 2025",
    isMain: true,
  },
  {
    id: "best-emea",
    name: "Best EMEA Organizer",
    shortName: "EMEA",
    description: "Best organizer from Europe, Middle East & Africa",
  },
  {
    id: "best-apac",
    name: "Best APAC Organizer",
    shortName: "APAC",
    description: "Best organizer from Asia-Pacific region",
  },
  {
    id: "best-na",
    name: "Best NA Organizer",
    shortName: "NA",
    description: "Best organizer from North America",
  },
  {
    id: "best-sa",
    name: "Best SA Organizer",
    shortName: "SA",
    description: "Best organizer from South America",
  },
  {
    id: "best-mena",
    name: "Best Middle East / Arab Organizer",
    shortName: "MENA",
    description: "Best organizer from Middle East & Arab region",
  },
];

export const organizers: Organizer[] = [
  {
    id: "esl",
    name: "ESL Gaming",
    logo: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=200&h=200&fit=crop",
    description: "World's largest esports company, organizing premium tournaments across multiple titles.",
    region: "EMEA",
  },
  {
    id: "blast",
    name: "BLAST Premier",
    logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    description: "Revolutionary tournament format bringing innovation to competitive gaming.",
    region: "EMEA",
  },
  {
    id: "pgl",
    name: "PGL Esports",
    logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
    description: "Premier esports production company known for exceptional Major events.",
    region: "EMEA",
  },
  {
    id: "riot",
    name: "Riot Games",
    logo: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=200&fit=crop",
    description: "Publishers of League of Legends and VALORANT with world-class esports ecosystems.",
    region: "NA",
  },
  {
    id: "epicenter",
    name: "EPICENTER",
    logo: "https://images.unsplash.com/photo-1493711662062-fa541f7f67e4?w=200&h=200&fit=crop",
    description: "Known for spectacular production value and immersive tournament experiences.",
    region: "EMEA",
  },
  {
    id: "weplay",
    name: "WePlay Esports",
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    description: "Creative tournament organizer with unique themed events and engaging content.",
    region: "EMEA",
  },
  {
    id: "beyond-summit",
    name: "Beyond The Summit",
    logo: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b07?w=200&h=200&fit=crop",
    description: "Community-focused organizer known for casual viewing experiences.",
    region: "NA",
  },
  {
    id: "starladder",
    name: "StarLadder",
    logo: "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?w=200&h=200&fit=crop",
    description: "Long-standing tournament organizer with rich esports history.",
    region: "EMEA",
  },
  {
    id: "gamers8",
    name: "Gamers8",
    logo: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=200&h=200&fit=crop",
    description: "Premier Saudi esports festival with massive prize pools.",
    region: "MENA",
  },
  {
    id: "arab-star",
    name: "Arab Star",
    logo: "https://images.unsplash.com/photo-1563089145-599997674d42?w=200&h=200&fit=crop",
    description: "Leading Arab esports organization promoting regional talent.",
    region: "MENA",
  },
  {
    id: "esl-brazil",
    name: "ESL Brazil",
    logo: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=200&h=200&fit=crop",
    description: "South America's premier tournament organizer for CS and more.",
    region: "SA",
  },
  {
    id: "psg-talon",
    name: "PSG Talon",
    logo: "https://images.unsplash.com/photo-1580327344181-c131d96064a9?w=200&h=200&fit=crop",
    description: "Leading APAC esports organization with international reach.",
    region: "APAC",
  },
];

export const getOrganizersByRegion = (region: string): Organizer[] => {
  if (region === "all" || region === "best-organizer-2025") {
    return organizers;
  }
  const regionMap: Record<string, string> = {
    "best-emea": "EMEA",
    "best-apac": "APAC",
    "best-na": "NA",
    "best-sa": "SA",
    "best-mena": "MENA",
  };
  return organizers.filter(org => org.region === regionMap[region]);
};
