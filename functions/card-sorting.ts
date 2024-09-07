import {
  CardsSortedByColor,
  CardsSortedByCost,
  CardsSortedByType,
  CardTypes
} from "../interfaces/sorted-cards";
import { Card } from "../models/card";

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
  landsSeperate = true
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

  cards.forEach((card) => {
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
          sortedCards.four.push(card);
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
    battle: []
  }

  cards.forEach((card) => {
    let cardType: string;

    if (card.faces?.front) {
      cardType = getCardTypeFromTypeLine(card.faces.front.typeLine);
    }
    else {
      cardType = getCardTypeFromTypeLine(card.typeLine);
    }

    switch (cardType.toLowerCase()) {
      case CardTypes.ARTIFACT.toLowerCase():
        sortedCards.artifact.push(card);
        return;
      case CardTypes.ENCHANTMENT.toLowerCase():
        sortedCards.enchantment.push(card);
        return;
      case CardTypes.CREATURE.toLowerCase():
        sortedCards.creature.push(card);
        return;
      case CardTypes.LAND.toLowerCase():
        sortedCards.land.push(card);
        return;
      case CardTypes.BATTLE.toLowerCase():
        sortedCards.battle.push(card);
        return;
      case CardTypes.PLANESWALKER.toLowerCase():
        sortedCards.planeswalker.push(card);
        return;
      case CardTypes.SORCERY.toLowerCase():
        sortedCards.sorcery.push(card);
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
  if (cardTypeFromTypeLine.includes(CardTypes.CREATURE.toLowerCase())) 
    return CardTypes.CREATURE;
  
  for (const cardType in CardTypes) {
    if (cardTypeFromTypeLine.includes(cardType.toLowerCase()))
      return cardType;
  }

  // card type couldn't be found
  return "";
}
