import { BarData } from "@/components/graph/bar/bar";
import { MTGColor, MTGColors } from "@/constants/mtg/mtg-colors";
import { MTGRarity } from "@/constants/mtg/mtg-rarity";
import { MTGCardTypes } from "@/constants/mtg/mtg-types";
import { SetData } from "../components/graph/layout/graph-plot";
import { Card } from "../models/card/card";
import { CardsSortedByColor } from "../models/sorted-cards/sorted-cards";
import {
  sortCardsAlphabetically,
  sortCardsByColor,
  sortCardsByCost,
  sortCardsByManaValue,
  sortCardsByType,
} from "./card-sorting";
import { getCountOfCards } from "./card-stats";

export function graphCardsByColor(cards: Card[]): SetData[] {
  const sortedCards = sortCardsByColor(
    sortCardsByManaValue(sortCardsAlphabetically(cards))
  );

  const sets: SetData[] = [
    {
      title: "White",
      data: [
        {
          name: "White",
          color: "white",
          cards: sortedCards.white,
        },
      ],
    },
    {
      title: "Blue",
      data: [
        {
          name: "Blue",
          color: MTGColors.BLUE,
          cards: sortedCards.blue,
        },
      ],
    },
    {
      title: "Black",
      data: [
        {
          name: "Black",
          color: MTGColors.BLACK,
          cards: sortedCards.black,
        },
      ],
    },
    {
      title: "Red",
      data: [
        {
          name: "Red",
          color: MTGColors.RED,
          cards: sortedCards.red,
        },
      ],
    },
    {
      title: "Green",
      data: [
        {
          name: "Green",
          color: MTGColors.GREEN,
          cards: sortedCards.green,
        },
      ],
    },
  ];

  if (getCountOfCards(sortedCards.gold) > 0) {
    sets.push({
      title: "Gold",
      data: [
        {
          name: "Gold",
          color: MTGColors.GOLD,
          cards: sortedCards.gold,
        },
      ],
    });
  }

  if (getCountOfCards(sortedCards.colorless) > 0) {
    sets.push({
      title: "Colorless",
      data: [
        {
          name: "Colorless",
          color: MTGColors.COLORLESS,
          cards: sortedCards.colorless,
        },
      ],
    });
  }

  if (getCountOfCards(sortedCards.land) > 0) {
    sets.push({
      title: "Land",
      data: [
        {
          name: "Land",
          color: MTGColors.LAND,
          cards: sortedCards.land,
        },
      ],
    });
  }

  return sets;
}

export function graphCardsByCost(cards: Card[]): SetData[] {
  const sortedCards = sortCardsByCost(sortCardsAlphabetically(cards));

  const sortedZero = sortCardsByColor(sortedCards.zero);
  const sortedOne = sortCardsByColor(sortedCards.one);
  const sortedTwo = sortCardsByColor(sortedCards.two);
  const sortedThree = sortCardsByColor(sortedCards.three);
  const sortedFour = sortCardsByColor(sortedCards.four);
  const sortedFive = sortCardsByColor(sortedCards.five);
  const sortedSix = sortCardsByColor(sortedCards.six);

  const sets: SetData[] = [];

  if (sortedCards.zero.length > 0) {
    sets.push(createSetDataByColor("0 Cost", sortedZero, { cost: 0 }));
  }
  sets.push(createSetDataByColor("1 Cost", sortedOne, { cost: 1 }));
  sets.push(createSetDataByColor("2 Cost", sortedTwo, { cost: 2 }));
  sets.push(createSetDataByColor("3 Cost", sortedThree, { cost: 3 }));
  sets.push(createSetDataByColor("4 Cost", sortedFour, { cost: 4 }));
  sets.push(createSetDataByColor("5 Cost", sortedFive, { cost: 5 }));
  if (sortedCards.six.length > 0) {
    sets.push(createSetDataByColor("6+ Cost", sortedSix, { cost: 6 }));
  }

  return sets;
}

export function graphCardsByType(cards: Card[]): SetData[] {
  const sortedCards = sortCardsByType(sortCardsAlphabetically(cards));

  const sortedLands = sortCardsByColor(sortedCards.land);
  const sortedEnchantments = sortCardsByColor(sortedCards.enchantment);
  const sortedCreatures = sortCardsByColor(sortedCards.creature);
  const sortedSorceries = sortCardsByColor(sortedCards.sorcery);
  const sortedPlaneswalkers = sortCardsByColor(sortedCards.planeswalker);
  const sortedArtifacts = sortCardsByColor(sortedCards.artifact);
  const sortedBattles = sortCardsByColor(sortedCards.battle);
  const sortedInstants = sortCardsByColor(sortedCards.instant);

  const sets: SetData[] = [
    createSetDataByColor("Creature", sortedCreatures, {
      type: MTGCardTypes.CREATURE,
    }),
    createSetDataByColor("Instant", sortedInstants, {
      type: MTGCardTypes.INSTANT,
    }),
    createSetDataByColor("Sorcery", sortedSorceries, {
      type: MTGCardTypes.SORCERY,
    }),
    createSetDataByColor("Artifact", sortedArtifacts, {
      type: MTGCardTypes.ARTIFACT,
    }),
    createSetDataByColor("Enchantment", sortedEnchantments, {
      type: MTGCardTypes.ENCHANTMENT,
    }),
    createSetDataByColor("Land", sortedLands, { type: MTGCardTypes.LAND }),
  ];

  if (sortedCards.planeswalker.length > 0) {
    createSetDataByColor("Planeswalker", sortedPlaneswalkers, {
      type: MTGCardTypes.PLANESWALKER,
    });
  }
  if (sortedCards.battle.length > 0) {
    createSetDataByColor("Battle", sortedBattles, {
      type: MTGCardTypes.BATTLE,
    });
  }

  return sets;
}

function createSetDataByColor(
  title: string,
  sortedCards: CardsSortedByColor,
  data?: { cost?: number; rarity?: MTGRarity; type?: string }
): SetData {
  const graphData: SetData = {
    title: title,
    cost: data?.cost,
    rarity: data?.rarity,
    type: data?.type,
    data: [
      {
        name: "White",
        color: MTGColors.WHITE,
        cards: sortedCards.white,
      },
      {
        name: "Blue",
        color: MTGColors.BLUE,
        cards: sortedCards.blue,
      },
      {
        name: "Black",
        color: MTGColors.BLACK,
        cards: sortedCards.black,
      },
      {
        name: "Red",
        color: MTGColors.RED,
        cards: sortedCards.red,
      },
      {
        name: "Green",
        color: MTGColors.GREEN,
        cards: sortedCards.green,
      },
      {
        name: "Gold",
        color: MTGColors.GOLD,
        cards: sortedCards.gold,
      },
      {
        name: "Colorless",
        color: MTGColors.COLORLESS,
        cards: sortedCards.colorless,
      },
      {
        name: "Land",
        color: MTGColors.LAND,
        cards: sortedCards.land,
      },
    ],
  };

  return graphData;
}

export function getBarHeight(
  color: MTGColor,
  ceiling: number,
  data: BarData[],
  additional?: number
) {
  const count =
    data
      .find((entry) => entry.color === color)
      ?.cards.reduce((acc, card) => acc + card.count, 0) || 0;

  return {
    count,
    height: (count / ceiling) * 100 + (additional || 0),
  };
}
