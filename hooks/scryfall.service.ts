import { ScryfallCatalog } from "@/models/scryfall/scryfall-catalog";
import { ScryfallToCard } from "../functions/scryfall";
import { Card, CardIdentifier } from "../models/card/card";
import { ScryfallCard } from "../models/scryfall/scryfall-card";
import { ScryfallList } from "../models/scryfall/scryfall-list";
import Api from "./api-methods";

async function autocomplete(query: string): Promise<string[]> {
  const response: ScryfallCatalog = await Api.get(`cards/autocomplete`, {
    q: query,
  }).catch((error) => console.error(error));

  return response
    ? response.data.filter((name) => name.substring(0, 2) !== "A-")
    : [];
}

async function findCards(query: string): Promise<Card[]> {
  const response: ScryfallList = await Api.get(`cards/search`, {
    q: query + " game:paper",
  }).catch((error) => console.error(error));

  return response ? response.data.map((card) => ScryfallToCard(card)) : [];
}

async function getCard(name: string, exact = false): Promise<Card> {
  const card: ScryfallCard = await Api.get(`cards/named`, {
    ...(exact ? { exact: name } : { fuzzy: name }),
  }).catch((error) => console.error(error));

  return ScryfallToCard(card);
}

async function getCardPrints(name: string): Promise<Card[]> {
  return await findCards(`name:/^${name}$/ unique:prints game:paper`);
}

async function getCardsFromCollection(cardsIdentifiers: CardIdentifier[]) {
  const bundles: CardIdentifier[][] = [];

  cardsIdentifiers.forEach((identifier, index) => {
    const bundleNumber = Math.floor(index / 75);

    if (bundles.length <= bundleNumber) bundles.push([]);

    bundles[bundleNumber].push(
      (identifier as any).id
        ? { id: (identifier as any).id }
        : (identifier as any).name
        ? { name: (identifier as any).name }
        : {
            set: (identifier as any).set,
            collectorNumber: (identifier as any).collectorNumber,
          }
    );
  });

  const scryfallCards: ScryfallCard[] = [];

  await Promise.all(
    bundles.map(
      async (bundle) =>
        await Api.post(`cards/collection`, {
          identifiers: bundle,
        })
          .then((response: ScryfallList) =>
            response.data.forEach((scryfallCard) =>
              scryfallCards.push(scryfallCard)
            )
          )
          .catch((error) => console.error(error))
    )
  );

  return scryfallCards.map((scryfallCard) => ScryfallToCard(scryfallCard));
}

async function getRandomCard(): Promise<Card> {
  const card: ScryfallCard = await Api.get(`cards/random`).catch((error) =>
    console.error(error)
  );

  return ScryfallToCard(card);
}

const ScryfallService = {
  autocomplete,
  findCards,
  getCard,
  getCardPrints,
  getCardsFromCollection,
  getRandomCard,
};

export default ScryfallService;
