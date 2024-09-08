import { MTGColorSymbol } from "../constants/mtg-colors";

export type Rarity = "common" | "uncommon" | "rare" | "mythic";

export interface Card {
  id: string;
  name: string;
  rarity: Rarity;
  cmc: number;
  colorIdentity: MTGColorSymbol[];
  manaCost: string;
  typeLine: string;
  producedMana?: string[];
  oracleText?: string;
  images?: ImageUris;
  faces: { front: CardFace; back: CardFace } | null;
}

export interface ImageUris {
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
  imageUris: ImageUris;
}
