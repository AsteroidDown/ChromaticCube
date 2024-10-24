import { MTGColors } from "@/constants/mtg/mtg-colors";
import { SetData } from "../components/graph/layout/graph-plot";
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

  const whiteCount = getCountOfCards(sortedCards.white);
  const blueCount = getCountOfCards(sortedCards.blue);
  const blackCount = getCountOfCards(sortedCards.black);
  const redCount = getCountOfCards(sortedCards.red);
  const greenCount = getCountOfCards(sortedCards.green);
  const goldCount = getCountOfCards(sortedCards.gold);
  const colorlessCount = getCountOfCards(sortedCards.colorless);
  const landCount = getCountOfCards(sortedCards.land);

  const sets: SetData[] = [
    {
      title: "White",
      data: [
        {
          name: "White",
          color: "white",
          count: whiteCount,
        },
      ],
    },
    {
      title: "Blue",
      data: [
        {
          name: "Blue",
          color: MTGColors.BLUE,
          count: blueCount,
        },
      ],
    },
    {
      title: "Black",
      data: [
        {
          name: "Black",
          color: MTGColors.BLACK,
          count: blackCount,
        },
      ],
    },
    {
      title: "Red",
      data: [
        {
          name: "Red",
          color: MTGColors.RED,
          count: redCount,
        },
      ],
    },
    {
      title: "Green",
      data: [
        {
          name: "Green",
          color: MTGColors.GREEN,
          count: greenCount,
        },
      ],
    },
  ];

  if (goldCount > 0) {
    sets.push({
      title: "Gold",
      data: [
        {
          name: "Gold",
          color: MTGColors.GOLD,
          count: goldCount,
        },
      ],
    });
  }

  if (colorlessCount > 0) {
    sets.push({
      title: "Colorless",
      data: [
        {
          name: "Colorless",
          color: MTGColors.COLORLESS,
          count: colorlessCount,
        },
      ],
    });
  }

  if (landCount > 0) {
    sets.push({
      title: "Land",
      data: [
        {
          name: "Land",
          color: MTGColors.LAND,
          count: landCount,
        },
      ],
    });
  }

  return sets;
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

  const sets: SetData[] = [];

  if (sortedCards.zero.length > 0) {
    sets.push(createSetDataByColor("0 Cost", sortedZero));
  }
  sets.push(createSetDataByColor("1 Cost", sortedOne));
  sets.push(createSetDataByColor("2 Cost", sortedTwo));
  sets.push(createSetDataByColor("3 Cost", sortedThree));
  sets.push(createSetDataByColor("4 Cost", sortedFour));
  sets.push(createSetDataByColor("5 Cost", sortedFive));
  if (sortedCards.six.length > 0) {
    sets.push(createSetDataByColor("6+ Cost", sortedSix));
  }

  return sets;
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

  const sets: SetData[] = [
    createSetDataByColor("Creature", sortedCreatures),
    createSetDataByColor("Instant", sortedInstants),
    createSetDataByColor("Sorcery", sortedSorceries),
    createSetDataByColor("Artifact", sortedArtifacts),
    createSetDataByColor("Enchantment", sortedEnchantments),
    createSetDataByColor("Land", sortedLands),
  ];

  if (sortedCards.planeswalker.length > 0) {
    createSetDataByColor("Planeswalker", sortedPlaneswalkers);
  }
  if (sortedCards.battle.length > 0) {
    createSetDataByColor("Battle", sortedBattles);
  }

  return sets;
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
        color: MTGColors.WHITE,
        count: getCountOfCards(sortedCards.white),
      },
      {
        name: "Blue",
        color: MTGColors.BLUE,
        count: getCountOfCards(sortedCards.blue),
      },
      {
        name: "Black",
        color: MTGColors.BLACK,
        count: getCountOfCards(sortedCards.black),
      },
      {
        name: "Red",
        color: MTGColors.RED,
        count: getCountOfCards(sortedCards.red),
      },
      {
        name: "Green",
        color: MTGColors.GREEN,
        count: getCountOfCards(sortedCards.green),
      },
      {
        name: "Gold",
        color: MTGColors.GOLD,
        count: getCountOfCards(sortedCards.gold),
      },
      {
        name: "Colorless",
        color: MTGColors.COLORLESS,
        count: getCountOfCards(sortedCards.colorless),
      },
    ],
  };

  if (!excludeLand) {
    graphData.data.push({
      name: "Land",
      color: MTGColors.LAND,
      count: getCountOfCards(sortedCards.land),
    });
  }

  return graphData;
}
