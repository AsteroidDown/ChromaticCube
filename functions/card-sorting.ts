import {
  CardsSortedByColor,
  CardsSortedByCost,
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

export function sortCardsByCost(cards: Card[]): CardsSortedByCost {
  const sortedCards: CardsSortedByCost = {
    zero: [],
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
    six: [],
    seven: [],
  };

  cards.forEach((card) => {
    if (card.cmc >= 7) sortedCards.seven.push(card);
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
