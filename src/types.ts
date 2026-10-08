export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: 'hoodies' | 'tees' | 'bottoms' | 'essentials';
  image: string;
  badge?: string;
  description: string;
  details: string[];
  sizes: string[];
  stockStatus: 'In Stock' | 'Limited Batch' | 'Pre-order';
  pledgeAmount: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface SolfeggioFrequency {
  hz: number;
  name: string;
  title: string;
  benefit: string;
  chakraOrFocus: string;
  color: string;
  accentHex: string;
}

export interface AmbientTrack {
  id: string;
  name: string;
  type: 'rain' | 'fire' | 'drone' | 'wind' | 'chimes';
  icon: string;
  description: string;
}

export interface StarNode {
  id: number;
  x: number;
  y: number;
  name: string;
}

export interface Constellation {
  id: string;
  title: string;
  symbol: string;
  meaning: string;
  affirmation: string;
  nodes: StarNode[];
  connections: [number, number][];
}

export interface MemoryCard {
  id: number;
  symbolId: string;
  name: string;
  icon: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Story {
  id: string;
  author: string;
  location: string;
  title: string;
  text: string;
  tag: string;
  flames: number;
  date: string;
}

export interface SafetyPlan {
  safeContacts: { name: string; phone: string; relation: string }[];
  warningSigns: string[];
  calmingActivities: string[];
  safePlaces: string[];
  coreMantra: string;
}
