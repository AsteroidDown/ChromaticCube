import { sortCardsByColor, sortCardsByRarity } from "@/functions/card-sorting";
import { titleCase } from "@/functions/text-manipulation";
import { Card } from "@/models/card/card";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import React, { ReactNode } from "react";
import { View } from "react-native";
import Text from "../ui/text/text";
import { getCellBackgroundColor } from "./chart";
import ChartCell from "./chart-cell";
import ChartColumnHeading from "./chart-column-heading";

interface RarityChartLayoutProps {
  cards: Card[];
  filters: CardFilters;
  menu?: ReactNode;
  smallTitles?: boolean;
}

export default function RarityChartLayout({
  cards,
  filters,
  menu,
  smallTitles = false,
}: RarityChartLayoutProps) {
  const colors = filters.colorFilter;

  const sortedCards = sortCardsByRarity(cards);
  const cardsSortedByColor = sortCardsByColor(cards);

  const sortedCommon = sortCardsByColor(sortedCards.common);
  const sortedUncommon = sortCardsByColor(sortedCards.uncommon);
  const sortedRare = sortCardsByColor(sortedCards.rare);
  const sortedMythic = sortCardsByColor(sortedCards.mythic);

  return (
    <>
      <View className="flex flex-row w-full -mt-1">
        <View className="flex justify-center items-center w-24">{menu}</View>

        <ChartColumnHeading large smallTitles={smallTitles} title="Common" />
        <ChartColumnHeading large smallTitles={smallTitles} title="Uncommon" />
        <ChartColumnHeading large smallTitles={smallTitles} title="Rare" />
        <ChartColumnHeading large smallTitles={smallTitles} title="Mythic" />
        <ChartColumnHeading
          double
          large
          smallTitles={smallTitles}
          title="Total"
        />
      </View>

      {colors?.map((color, index) => (
        <View key={color + index} className="flex-1 flex flex-row">
          <View
            className={`flex flex-row justify-end items-center w-24 pr-2 border-t border-r border-background-300 ${getCellBackgroundColor(
              color
            )}`}
          >
            <Text thickness="semi">{titleCase(color)}</Text>
          </View>

          <ChartCell
            rarity={"common"}
            color={color}
            sortedCards={sortedCommon}
          />
          <ChartCell
            rarity={"uncommon"}
            color={color}
            sortedCards={sortedUncommon}
          />
          <ChartCell rarity={"rare"} color={color} sortedCards={sortedRare} />
          <ChartCell
            rarity={"mythic"}
            color={color}
            sortedCards={sortedMythic}
          />

          <ChartCell
            hideRightBorder
            color={color}
            sortedCards={cardsSortedByColor}
          />
        </View>
      ))}
    </>
  );
}
