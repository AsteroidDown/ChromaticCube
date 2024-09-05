import { MTGColorSymbol } from "../constants/colors";
import { Rarity } from "./card";

export interface ScryfallCard {
  name: string;
  rarity: Rarity;
  cmc: number;
  color_identity: MTGColorSymbol[];
  mana_cost: string;
  type_line: string;
  produced_mana: any[];
  oracle_text: string;
  image_uris: ScryfallImageUris;
  card_faces: ScryfallCardFace[];
}

export interface ScryfallImageUris {
  art_crop: string;
  border_crop: string;
  large: string;
  normal: string;
  png: string;
  small: string;
}

export interface ScryfallCardFace {
  name: string;
  type_line: string;
  mana_cost: string;
  image_uris: ScryfallImageUris;
}
