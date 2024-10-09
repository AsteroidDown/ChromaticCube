import { createContext } from "react";
import { Card } from "../../models/card/card";

const StoredCardsContext = createContext({
  storedCards: [] as Card[],
  setStoredCards: (cards: Card[]) => {},
});

export default StoredCardsContext;
