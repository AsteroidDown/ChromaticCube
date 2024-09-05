import { MTGColorSymbol } from "../constants/colors";
import { Rarity } from "./card";

export interface ScryfallCard {
  name: string;
  rarity: Rarity;
  cmc: number;
  color_identity: MTGColorSymbol[];
  mana_cost: string;
  image_uris: ScryfallImageUris;
}

export interface ScryfallImageUris {
  art_crop: string;
  border_crop: string;
  large: string;
  normal: string;
  png: string;
  small: string;
}
