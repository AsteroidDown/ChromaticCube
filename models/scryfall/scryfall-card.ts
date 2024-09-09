import { MTGColorSymbol } from "../../constants/mtg/mtg-colors";
import { Rarity } from "../card/card";

export interface ScryfallCard {
  id: string;
  name: string;
  card_back_id: string;
  rarity: Rarity;
  cmc: number;
  color_identity: MTGColorSymbol[];
  mana_cost: string;
  type_line: string;
  produced_mana: any[];
  oracle_text: string;
  image_uris: ScryfallImageUris;
  card_faces: ScryfallCardFace[];
  prices: ScryfallCardPrices;
  purchase_uris: ScryfallCardPriceUris;
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
  oracle_text: string;
  image_uris: ScryfallImageUris;
}

export interface ScryfallCardPrices {
  usd: number | null;
  usd_foil: number | null;
  usd_etched: number | null;
  eur: number | null;
  eur_foil: number | null;
  tix: number | null;
}

export interface ScryfallCardPriceUris {
  tcgplayer: string;
  cardmarket: string;
  cardhoarder: string;
}
