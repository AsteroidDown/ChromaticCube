import { MTGColor } from "../../constants/mtg/mtg-colors";
import { MTGCardTypes } from "../../constants/mtg/mtg-types";
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
  land: Card[];
  enchantment: Card[];
  artifact: Card[];
  instant: Card[];
  sorcery: Card[];
  creature: Card[];
  planeswalker: Card[];
  battle: Card[];
}

export interface CardFilters {
  color?: MTGColor[];
  types?: MTGCardTypes[];
}
