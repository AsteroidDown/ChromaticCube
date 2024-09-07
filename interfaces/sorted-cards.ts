import { Card } from "../models/card";

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
}
