import {
  MTGColor,
  MTGColorMap,
  MTGColorSymbol,
} from "../constants/mtg/mtg-colors";
import { MTGRarity } from "../constants/mtg/mtg-rarity";
import { MTGCardTypes } from "../constants/mtg/mtg-types";
import { Card } from "../models/card/card";
import { CardFilters } from "../models/sorted-cards/sorted-cards";

export function filterCard(card: Card, filters: CardFilters) {
  return (
    (filters.colorFilter?.length &&
      filterCardByColor(card, filters.colorFilter)) ||
    (filters.typeFilter?.length &&
      filterCardByType(card, filters.typeFilter)) ||
    (filters.rarityFilter?.length &&
      filterCardByRarity(card, filters.rarityFilter))
  );
}

export function filterCardByColor(card: Card, colors: MTGColor[]) {
  const filterColors = colors?.map((color) => MTGColorMap.get(color));

  const baseColors: MTGColorSymbol[] = ["W", "U", "B", "R", "G"];
  const filteredBaseColors = baseColors.filter((color) =>
    filterColors.includes(color)
  );

  // Filter multi colored cards exclusively
  const multiColored = filterColors?.includes("M");
  if (multiColored) {
    if (card.colorIdentity.length < 2) return true;

    const multiColoredAndColor =
      multiColored && baseColors.some((color) => filterColors?.includes(color));

    if (multiColoredAndColor) {
      if (
        filteredBaseColors.length > 1 &&
        card.colorIdentity.length !== filteredBaseColors.length &&
        !card.colorIdentity.every((color) => filteredBaseColors.includes(color))
      ) {
        return true;
      } else if (
        filteredBaseColors.length === 1 &&
        !card.colorIdentity.some((color) => filteredBaseColors.includes(color))
      ) {
        return true;
      }
    }
  }

  // Filter mono colored cards exclusively
  const monoColored = filterColors?.includes("1");
  if (monoColored) {
    if (card.colorIdentity.length !== 1) return true;

    const monoColoredAndColor =
      monoColored && baseColors.some((color) => filterColors?.includes(color));
    if (
      monoColoredAndColor &&
      !card.colorIdentity.some((color) => filterColors?.includes(color))
    ) {
      return true;
    }
  }

  // Filter colorless
  if (filterColors.includes("C") && card.colorIdentity.length !== 0) {
    return true;
  }

  // Filter cards with a color
  if (
    filteredBaseColors.length &&
    !filteredBaseColors.some((color) => card.colorIdentity.includes(color!))
  ) {
    return true;
  }

  return false;
}

export function filterCardByType(card: Card, types: MTGCardTypes[]) {
  return !types.some((type) =>
    card.faces?.front
      ? card.faces.front.typeLine.includes(type)
      : card.typeLine.includes(type)
  );
}

export function filterCardByRarity(card: Card, rarities: MTGRarity[]) {
  return !rarities.some((rarity) => card.rarity === rarity);
}
