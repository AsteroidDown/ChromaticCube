import { sortCardsByColor, sortCardsByRarity } from "@/functions/card-sorting";
import { titleCase } from "@/functions/text-manipulation";
import { Card } from "@/models/card/card";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import React from "react";
import { View } from "react-native";
import Text from "../ui/text/text";
import { getCellBackgroundColor } from "./chart";
import ChartCell from "./chart-cell";
import ChartColumnHeading from "./chart-column-heading";

interface RarityChartLayoutProps {
  cards: Card[];
  filters: CardFilters;
}

export default function RarityChartLayout({
  cards,
  filters,
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
        <View className="w-24"></View>
        <ChartColumnHeading large title="Common" />
        <ChartColumnHeading large title="Uncommon" />
        <ChartColumnHeading large title="Rare" />
        <ChartColumnHeading large title="Mythic" />
        <ChartColumnHeading double large title="Total" />
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
