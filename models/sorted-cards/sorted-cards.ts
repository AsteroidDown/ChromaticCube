import { MTGColor } from "../../constants/mtg/mtg-colors";
import { MTGRarity } from "../../constants/mtg/mtg-rarity";
import { MTGCardTypes } from "../../constants/mtg/mtg-types";
import { SortDirection } from "../../constants/sorting";
import { Card } from "../card/card";

export interface CardsSortedByColor {
  white: Card[];
  blue: Card[];
  black: Card[];
  red: Card[];
  green: Card[];
  gold: Card[];
  colorless: Card[];
  land: Card[];
}

export interface CardsSortedByCost {
  zero: Card[];
  one: Card[];
  two: Card[];
  three: Card[];
  four: Card[];
  five: Card[];
  six: Card[];
  seven: Card[];
  land: Card[];
}

export interface CardsSortedByType {
  creature: Card[];
  instant: Card[];
  sorcery: Card[];
  artifact: Card[];
  enchantment: Card[];
  planeswalker: Card[];
  battle: Card[];
  land: Card[];
}

export interface CardFilters {
  colorFilter?: MTGColor[];
  typeFilter?: MTGCardTypes[];
  rarityFilter?: MTGRarity[];
  priceSort?: SortDirection;
}
