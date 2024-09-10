import { SetData } from "../components/graph/layout/graph-plot";
import { MTGCardTypes } from "../constants/mtg/mtg-types";
import { Card } from "../models/card/card";
import { CardsSortedByColor } from "../models/sorted-cards/sorted-cards";
import {
  sortCardsByColor,
  sortCardsByCost,
  sortCardsByType,
} from "./card-sorting";
import { getCountOfCards } from "./card-stats";

export function graphCardsByColor(cards: Card[]): SetData[] {
  const sortedCards = sortCardsByColor(cards);

  return [
    {
      title: "White",
      data: [
        {
          name: "White",
          color: "white",
          count: getCountOfCards(sortedCards.white),
        },
      ],
    },
    {
      title: "Blue",
      data: [
        {
          name: "Blue",
          color: "blue",
          count: getCountOfCards(sortedCards.blue),
        },
      ],
    },
    {
      title: "Black",
      data: [
        {
          name: "Black",
          color: "black",
          count: getCountOfCards(sortedCards.black),
        },
      ],
    },
    {
      title: "Red",
      data: [
        {
          name: "Red",
          color: "red",
          count: getCountOfCards(sortedCards.red),
        },
      ],
    },
    {
      title: "Green",
      data: [
        {
          name: "Green",
          color: "green",
          count: getCountOfCards(sortedCards.green),
        },
      ],
    },
    {
      title: "Gold",
      data: [
        {
          name: "Gold",
          color: "gold",
          count: getCountOfCards(sortedCards.gold),
        },
      ],
    },
    {
      title: "Colorless",
      data: [
        {
          name: "Colorless",
          color: "colorless",
          count: getCountOfCards(sortedCards.colorless),
        },
      ],
    },
    {
      title: "Land",
      data: [
        {
          name: "Land",
          color: "land",
          count: getCountOfCards(sortedCards.land),
        },
      ],
    },
  ];
}

export function graphCardsByCost(cards: Card[]): SetData[] {
  const sortedCards = sortCardsByCost(cards);

  const sortedZero = sortCardsByColor(sortedCards.zero);
  const sortedOne = sortCardsByColor(sortedCards.one);
  const sortedTwo = sortCardsByColor(sortedCards.two);
  const sortedThree = sortCardsByColor(sortedCards.three);
  const sortedFour = sortCardsByColor(sortedCards.four);
  const sortedFive = sortCardsByColor(sortedCards.five);
  const sortedSix = sortCardsByColor(sortedCards.six);
  const sortedSeven = sortCardsByColor(sortedCards.seven);

  return [
    createSetDataByColor("0 Cost", sortedZero),
    createSetDataByColor("1 Cost", sortedOne),
    createSetDataByColor("2 Cost", sortedTwo),
    createSetDataByColor("3 Cost", sortedThree),
    createSetDataByColor("4 Cost", sortedFour),
    createSetDataByColor("5 Cost", sortedFive),
    createSetDataByColor("6 Cost", sortedSix),
    createSetDataByColor("7+ Cost", sortedSeven),
  ];
}

export function graphCardsByType(cards: Card[]): SetData[] {
  const sortedCards = sortCardsByType(cards);

  const sortedLands = sortCardsByColor(sortedCards.land);
  const sortedEnchantments = sortCardsByColor(sortedCards.enchantment);
  const sortedCreatures = sortCardsByColor(sortedCards.creature);
  const sortedSorceries = sortCardsByColor(sortedCards.sorcery);
  const sortedPlaneswalkers = sortCardsByColor(sortedCards.planeswalker);
  const sortedArtifacts = sortCardsByColor(sortedCards.artifact);
  const sortedBattles = sortCardsByColor(sortedCards.battle);
  const sortedInstants = sortCardsByColor(sortedCards.instant);

  return [
    createSetDataByColor(MTGCardTypes.LAND, sortedLands),
    createSetDataByColor(MTGCardTypes.ENCHANTMENT, sortedEnchantments),
    createSetDataByColor(MTGCardTypes.CREATURE, sortedCreatures),
    createSetDataByColor(MTGCardTypes.SORCERY, sortedSorceries),
    createSetDataByColor(MTGCardTypes.PLANESWALKER, sortedPlaneswalkers),
    createSetDataByColor(MTGCardTypes.ARTIFACT, sortedArtifacts),
    createSetDataByColor(MTGCardTypes.BATTLE, sortedBattles),
    createSetDataByColor(MTGCardTypes.INSTANT, sortedInstants),
  ];
}

function createSetDataByColor(
  title: string,
  sortedCards: CardsSortedByColor,
  excludeLand?: boolean
): SetData {
  const graphData: SetData = {
    title: title,
    data: [
      {
        name: "White",
        color: "white",
        count: getCountOfCards(sortedCards.white),
      },
      {
        name: "Blue",
        color: "blue",
        count: getCountOfCards(sortedCards.blue),
      },
      {
        name: "Black",
        color: "black",
        count: getCountOfCards(sortedCards.black),
      },
      {
        name: "Red",
        color: "red",
        count: getCountOfCards(sortedCards.red),
      },
      {
        name: "Green",
        color: "green",
        count: getCountOfCards(sortedCards.green),
      },
      {
        name: "Gold",
        color: "gold",
        count: getCountOfCards(sortedCards.gold),
      },
      {
        name: "Colorless",
        color: "colorless",
        count: getCountOfCards(sortedCards.colorless),
      },
    ],
  };

  if (!excludeLand) {
    graphData.data.push({
      name: "Land",
      color: "land",
      count: getCountOfCards(sortedCards.land),
    });
  }

  return graphData;
}
