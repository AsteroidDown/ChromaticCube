import { ScryfallToCard } from "../functions/scryfall";
import { Card } from "../models/card";
import { ScryfallCard } from "../models/scryfall/scryfall-card";
import { ScryfallList } from "../models/scryfall/scryfall-list";
import Api from "./api-methods";

async function findCards(query: string): Promise<Card[]> {
  const response: ScryfallList = await Api.get(`cards/search`, {
    q: query + " is:booster",
  }).catch((error) => console.error(error));

  return response.data.map((card) => ScryfallToCard(card));
}

async function getCard(name: string, exact = false): Promise<Card> {
  const card: ScryfallCard = await Api.get(`cards/named`, {
    ...(exact ? { exact: name } : { fuzzy: name }),
  }).catch((error) => console.error(error));

  return ScryfallToCard(card);
}

async function getRandomCard(): Promise<Card> {
  const card: ScryfallCard = await Api.get(`cards/random`).catch((error) =>
    console.error(error)
  );

  return ScryfallToCard(card);
}

const CardsService = {
  findCards,
  getCard,
  getRandomCard,
};

export default CardsService;
