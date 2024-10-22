import { MTGLegality } from "@/constants/mtg/mtg-legality";
import { MTGColorSymbol } from "../../constants/mtg/mtg-colors";
import { Rarity } from "../card/card";

export interface ScryfallCard {
  id: string;
  name: string;
  set: string;
  collector_number: string;
  card_back_id: string;
  rarity: Rarity;
  cmc: number;
  color_identity: MTGColorSymbol[];
  mana_cost: string;
  type_line: string;
  loyalty?: string;
  defense?: string;
  produced_mana: any[];
  oracle_text: string;
  image_uris: ScryfallImageUris;
  card_faces: ScryfallCardFace[];
  prices: ScryfallCardPrices;
  purchase_uris: ScryfallCardPriceUris;
  legalities: ScryfallCardLegalities;
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
  loyalty?: string;
  defense?: string;
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

export interface ScryfallCardLegalities {
  // Common formats
  standard: MTGLegality;
  pioneer: MTGLegality;
  modern: MTGLegality;
  legacy: MTGLegality;
  vintage: MTGLegality;

  commander: MTGLegality;
  oathbreaker: MTGLegality;

  alchemy: MTGLegality; // Arena Standard Equivalent
  explorer: MTGLegality; // Arena Pioneer Equivalent
  historic: MTGLegality; // Arena Modern Equivalent
  timeless: MTGLegality; // Arena Legacy Equivalent

  brawl: MTGLegality;
  pauper: MTGLegality;
  penny: MTGLegality;

  // Non-common formats
  future: MTGLegality;
  gladiator: MTGLegality;
  standardbrawl: MTGLegality;
  paupercommander: MTGLegality;
  duel: MTGLegality;
  oldschool: MTGLegality;
  premodern: MTGLegality;
  pred: MTGLegality;
}
