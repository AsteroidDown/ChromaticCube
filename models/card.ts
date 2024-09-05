import { MTGColorSymbol } from "../constants/colors";

export type Rarity = "common" | "uncommon" | "rare" | "mythic";

export interface Card {
  name: string;
  rarity: Rarity;
  cmc: number;
  colorIdentity: MTGColorSymbol[];
  manaCost: string;
  images: ImageUris;
}

export interface ImageUris {
  small: string;
  normal: string;
  large: string;

  png: string;
  artCrop: string;
  borderCrop: string;
}
