import { Card } from "../models/card/card";

export function getTotalValueOfCards(cards: Card[], euro: boolean = false) {
  return cards.reduce(
    (acc, card) => acc + (euro ? card.prices.eur || 0 : card.prices.usd || 0),
    0
  );
}
