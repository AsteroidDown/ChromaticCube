import { SetData } from "../components/graph/layout/graph-plot";
import { CardsSortedByColor } from "../interfaces/sorted-cards";
import { Card } from "../models/card";
import { sortCardsByColor, sortCardsByCost } from "./card-sorting";

export function graphCardsByColor(cards: Card[]): SetData[] {
  const sortedCards = sortCardsByColor(cards);

  return [
    {
      title: "White",
      data: [
        {
          name: "White",
          color: "white",
          count: sortedCards.white.length,
        },
      ],
    },
    {
      title: "Blue",
      data: [
        {
          name: "Blue",
          color: "blue",
          count: sortedCards.blue.length,
        },
      ],
    },
    {
      title: "Black",
      data: [
        {
          name: "Black",
          color: "black",
          count: sortedCards.black.length,
        },
      ],
    },
    {
      title: "Red",
      data: [
        {
          name: "Red",
          color: "red",
          count: sortedCards.red.length,
        },
      ],
    },
    {
      title: "Green",
      data: [
        {
          name: "Green",
          color: "green",
          count: sortedCards.green.length,
        },
      ],
    },
    {
      title: "Gold",
      data: [
        {
          name: "Gold",
          color: "gold",
          count: sortedCards.gold.length,
        },
      ],
    },
    {
      title: "Colorless",
      data: [
        {
          name: "Colorless",
          color: "colorless",
          count: sortedCards.colorless.length,
        },
      ],
    },
    {
      title: "Land",
      data: [
        {
          name: "Land",
          color: "land",
          count: sortedCards.land.length,
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
    createSetDataFromColor("0 Cost", sortedZero),
    createSetDataFromColor("1 Cost", sortedOne),
    createSetDataFromColor("2 Cost", sortedTwo),
    createSetDataFromColor("3 Cost", sortedThree),
    createSetDataFromColor("4 Cost", sortedFour),
    createSetDataFromColor("5 Cost", sortedFive),
    createSetDataFromColor("6 Cost", sortedSix),
    createSetDataFromColor("7+ Cost", sortedSeven),
  ];
}

function createSetDataFromColor(
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
        count: sortedCards.white.length,
      },
      {
        name: "Blue",
        color: "blue",
        count: sortedCards.blue.length,
      },
      {
        name: "Black",
        color: "black",
        count: sortedCards.black.length,
      },
      {
        name: "Red",
        color: "red",
        count: sortedCards.red.length,
      },
      {
        name: "Green",
        color: "green",
        count: sortedCards.green.length,
      },
      {
        name: "Gold",
        color: "gold",
        count: sortedCards.gold.length,
      },
      {
        name: "Colorless",
        color: "colorless",
        count: sortedCards.colorless.length,
      },
    ],
  };

  if (!excludeLand) {
    graphData.data.push({
      name: "Land",
      color: "land",
      count: sortedCards.land.length,
    });
  }

  return graphData;
}
