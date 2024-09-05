import { ScryfallToCard } from "../functions/scryfall";
import { Card } from "../models/card";
import { ScryfallCard } from "../models/scryfall-card";
import Api from "./api-methods";

async function getCard(name: string, exact = false): Promise<Card> {
  const card: ScryfallCard = await Api.get(`cards/named`, {
    ...(exact ? { exact: name } : { fuzzy: name }),
  });

  return ScryfallToCard(card);
}

const CardsService = {
  getCard,
};

export default CardsService;
