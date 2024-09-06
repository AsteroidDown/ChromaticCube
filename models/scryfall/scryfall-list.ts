import { ScryfallCard } from "./scryfall-card";

export interface ScryfallList {
  object: string;
  total_cards: number;
  has_more: boolean;
  next_page: string;
  data: ScryfallCard[];
}
