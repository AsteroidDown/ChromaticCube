import { MTGColorMap } from "../constants/mtg/mtg-colors";
import { MTGCardTypes } from "../constants/mtg/mtg-types";
import { Card } from "../models/card/card";
import {
  CardFilters,
  CardsSortedByColor,
  CardsSortedByCost,
  CardsSortedByType,
} from "../models/sorted-cards/sorted-cards";

export function sortCardsAlphabetically(cards: Card[]) {
  return cards.sort((a, b) => a.name.localeCompare(b.name));
}

export function sortCardsByPrice(
  cards: Card[],
  ascending = true,
  euro = false
) {
  return cards.sort((a, b) =>
    euro
      ? ((a.prices.eur || 0) - (b.prices.eur || 0)) * (ascending ? 1 : -1)
      : ((a.prices.usd || 0) - (b.prices.usd || 0)) * (ascending ? 1 : -1)
  );
}

export function sortCardsByColor(cards: Card[]): CardsSortedByColor {
  const sortedCards: CardsSortedByColor = {
    white: [],
    blue: [],
    black: [],
    red: [],
    green: [],
    gold: [],
    colorless: [],
    land: [],
  };

  cards.forEach((card) => {
    if (
      card.faces
        ? card.faces?.front.typeLine.includes("Land")
        : card.typeLine.includes("Land")
    ) {
      sortedCards.land.push(card);
    } else if (card.colorIdentity.length > 1) {
      sortedCards.gold.push(card);
    } else if (card.colorIdentity.length === 0) {
      sortedCards.colorless.push(card);
    } else {
      switch (card.colorIdentity[0]) {
        case "W":
          sortedCards.white.push(card);
          return;
        case "U":
          sortedCards.blue.push(card);
          return;
        case "B":
          sortedCards.black.push(card);
          return;
        case "R":
          sortedCards.red.push(card);
          return;
        case "G":
          sortedCards.green.push(card);
          return;
      }
    }
  });

  return sortedCards;
}

export function sortCardsByCost(
  cards: Card[],
  filters?: CardFilters
): CardsSortedByCost {
  const sortedCards: CardsSortedByCost = {
    zero: [],
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
    six: [],
    seven: [],
    land: [],
  };

  const filteredColors = filters?.colorFilter?.map((color) =>
    MTGColorMap.get(color)
  );
  const filteredTypes = filters?.typeFilter;
  const filteredRarity = filters?.rarityFilter;

  cards.forEach((card) => {
    if (
      (filteredColors?.length &&
        !filteredColors.some(
          (color) =>
            (color === "C" && card.colorIdentity.length == 0) ||
            (color === "1" && card.colorIdentity.length === 1) ||
            (color === "M" && card.colorIdentity.length > 1) ||
            card.colorIdentity.includes(color!)
        )) ||
      (filteredTypes?.length &&
        !filteredTypes.some((type) =>
          card.faces?.front
            ? card.faces.front.typeLine.includes(type)
            : card.typeLine.includes(type)
        )) ||
      (filteredRarity?.length &&
        !filteredRarity.some((rarity) => card.rarity === rarity))
    ) {
      return;
    }

    if (
      card.faces
        ? card.faces?.front.typeLine.includes("Land")
        : card.typeLine.includes("Land")
    ) {
      sortedCards.land.push(card);
    } else if (card.cmc >= 7) sortedCards.seven.push(card);
    else {
      switch (card.cmc) {
        case 0:
          sortedCards.zero.push(card);
          return;
        case 1:
          sortedCards.one.push(card);
          return;
        case 2:
          sortedCards.two.push(card);
          return;
        case 3:
          sortedCards.three.push(card);
          return;
        case 4:
          sortedCards.four.push(card);
          return;
        case 5:
          sortedCards.five.push(card);
          return;
        case 6:
          sortedCards.six.push(card);
          return;
      }
    }
  });

  return sortedCards;
}

export function sortCardsByType(cards: Card[]): CardsSortedByType {
  const sortedCards: CardsSortedByType = {
    land: [],
    enchantment: [],
    artifact: [],
    instant: [],
    sorcery: [],
    creature: [],
    planeswalker: [],
    battle: [],
  };

  cards.forEach((card) => {
    const cardType = card.faces?.front
      ? getCardTypeFromTypeLine(card.faces.front.typeLine)
      : getCardTypeFromTypeLine(card.typeLine);

    switch (cardType.toLowerCase()) {
      case MTGCardTypes.ARTIFACT.toLowerCase():
        sortedCards.artifact.push(card);
        return;
      case MTGCardTypes.ENCHANTMENT.toLowerCase():
        sortedCards.enchantment.push(card);
        return;
      case MTGCardTypes.CREATURE.toLowerCase():
        sortedCards.creature.push(card);
        return;
      case MTGCardTypes.LAND.toLowerCase():
        sortedCards.land.push(card);
        return;
      case MTGCardTypes.BATTLE.toLowerCase():
        sortedCards.battle.push(card);
        return;
      case MTGCardTypes.PLANESWALKER.toLowerCase():
        sortedCards.planeswalker.push(card);
        return;
      case MTGCardTypes.SORCERY.toLowerCase():
        sortedCards.sorcery.push(card);
        return;
      case MTGCardTypes.INSTANT.toLowerCase():
        sortedCards.instant.push(card);
        return;
    }
  });

  return sortedCards;
}

/**
 *
 * @param typeLine the type line for a card as given by scryfall api
 * @returns the creature type as given in CardTypes const (see sorted-cards.ts) or an empty string if the type could not be discerned
 */
function getCardTypeFromTypeLine(typeLine: string): string {
  const cardTypeFromTypeLine = typeLine.split("-")[0].toLowerCase();

  // creature type has priority in hybrid types so check for it first here
  if (cardTypeFromTypeLine.includes(MTGCardTypes.CREATURE.toLowerCase())) {
    return MTGCardTypes.CREATURE;
  }

  for (const cardType in MTGCardTypes) {
    if (cardTypeFromTypeLine.includes(cardType.toLowerCase())) return cardType;
  }

  // card type couldn't be found
  return "";
}
