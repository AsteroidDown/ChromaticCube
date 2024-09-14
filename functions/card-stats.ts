import { Card } from "../models/card/card";
import { CardFilters } from "../models/sorted-cards/sorted-cards";
import { filterCard } from "./card-filtering";

export function getTotalValueOfCards(
  cards: Card[],
  filters?: CardFilters,
  euro: boolean = false
) {
  return (
    Math.round(
      cards.reduce((acc, card) => {
        if (filters && filterCard(card, filters)) return acc;

        return (
          acc +
          card.count * (euro ? card.prices.eur || 0 : card.prices.usd || 0)
        );
      }, 0) * 100
    ) / 100
  );
}

export function getCountOfCards(cards: Card[], filters?: CardFilters) {
  return cards.reduce((acc, card) => {
    if (filters && filterCard(card, filters)) return acc;

    return acc + card.count;
  }, 0);
}
