import { MTGColorSymbol } from "../../constants/mtg/mtg-colors";

export type Rarity = "common" | "uncommon" | "rare" | "mythic";

export interface Card {
  id: string;
  name: string;
  cardBackId: string;
  rarity: Rarity;
  cmc: number;
  colorIdentity: MTGColorSymbol[];
  manaCost: string;
  typeLine: string;
  producedMana?: string[];
  oracleText?: string;
  images?: CardImageUris;
  faces: { front: CardFace; back: CardFace } | null;
  prices: CardPrices;
  priceUris: CardPriceUris;
}

export interface CardImageUris {
  small: string;
  normal: string;
  large: string;

  png: string;
  artCrop: string;
  borderCrop: string;
}

export interface CardFace {
  name: string;
  typeLine: string;
  manaCost: string;
  oracleText: string;
  imageUris: CardImageUris;
}

export interface CardPrices {
  usd: number | null;
  usdFoil: number | null;
  usdEtched: number | null;
  eur: number | null;
  eurFoil: number | null;
  tix: number | null;
}

export interface CardPriceUris {
  tcgplayer: string;
  cardmarket: string;
  cardhoarder: string;
}
