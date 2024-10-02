import Box from "@/components/ui/box/box";
import { MTGColor } from "@/constants/mtg/mtg-colors";
import { sortCardsByColor, sortCardsByCost } from "@/functions/card-sorting";
import { getLocalStorageStoredCards } from "@/functions/local-storage/card-local-storage";
import { titleCase } from "@/functions/text-manipulation";
import { DashboardItemSize } from "@/models/dashboard/dashboard";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import React from "react";
import { View } from "react-native";
import Text from "../../ui/text/text";
import { getCellBackgroundColor } from "../chart";
import ChartColumnHeading from "../chart-column-heading";
import CostChartCell from "./cost-chart-cell";

interface ChartCostLayoutProps {
  size: DashboardItemSize;
  filters: CardFilters;
}

export default function ChartCostLayout({
  size,
  filters,
}: ChartCostLayoutProps) {
  const colors = filters.colorFilter;

  const cards = getLocalStorageStoredCards();

  const sortedCards = sortCardsByCost(cards);
  const cardsSortedByColor = sortCardsByColor(cards);

  const sortedZero = sortCardsByColor(sortedCards.zero);
  const sortedOne = sortCardsByColor(sortedCards.one);
  const sortedTwo = sortCardsByColor(sortedCards.two);
  const sortedThree = sortCardsByColor(sortedCards.three);
  const sortedFour = sortCardsByColor(sortedCards.four);
  const sortedFive = sortCardsByColor(sortedCards.five);
  const sortedSix = sortCardsByColor(sortedCards.six);
  const sortedSeven = sortCardsByColor(sortedCards.seven);

  function getRowCards(color: MTGColor) {
    const index = Object.keys(sortedOne).findIndex((key) => key === color) || 0;

    return [
      ...Object.values(sortedZero)[index],
      ...Object.values(sortedOne)[index],
      ...Object.values(sortedTwo)[index],
      ...Object.values(sortedThree)[index],
      ...Object.values(sortedFour)[index],
      ...Object.values(sortedFive)[index],
      ...Object.values(sortedSix)[index],
      ...Object.values(sortedSeven)[index],
    ];
  }

  return (
    <Box
      className={`flex-1 flex self-stretch !p-0 !bg-background-100 border-2 border-background-300 overflow-hidden ${
        size === "sm"
          ? "lg:min-w-[25%] lg:max-w-[33%]"
          : size === "md"
          ? "lg:min-w-[50%] lg:max-w-[66%]"
          : "lg:min-w-[100%]"
      }`}
    >
      <View className="flex flex-row w-full -mt-1">
        <View className="w-20"></View>
        {sortedCards.zero.length > 0 && (
          <ChartColumnHeading title="Zero" size={size} />
        )}
        <ChartColumnHeading title="One" size={size} />
        <ChartColumnHeading title="Two" size={size} />
        <ChartColumnHeading title="Three" size={size} />
        <ChartColumnHeading title="Four" size={size} />
        <ChartColumnHeading title="Five" size={size} />
        <ChartColumnHeading title="Six" size={size} />
        {sortedCards.seven.length > 0 && (
          <ChartColumnHeading title="Seven" size={size} />
        )}
        <ChartColumnHeading double title="Total" size={size} />
      </View>

      {colors?.map((color, index) => (
        <View key={color + index} className="flex-1 flex flex-row">
          <View
            className={`flex flex-row justify-end items-center w-20 pr-2 border-t border-r border-background-300 ${getCellBackgroundColor(
              color
            )}`}
          >
            <Text thickness="semi">{titleCase(color)}</Text>
          </View>

          {sortedCards.zero.length > 0 && (
            <CostChartCell cost={0} color={color} sortedCards={sortedZero} />
          )}
          <CostChartCell cost={1} color={color} sortedCards={sortedOne} />
          <CostChartCell cost={2} color={color} sortedCards={sortedTwo} />
          <CostChartCell cost={3} color={color} sortedCards={sortedThree} />
          <CostChartCell cost={4} color={color} sortedCards={sortedFour} />
          <CostChartCell cost={5} color={color} sortedCards={sortedFive} />
          <CostChartCell cost={6} color={color} sortedCards={sortedSix} />
          {sortedCards.seven?.length && (
            <CostChartCell
              double
              cost={7}
              color={color}
              sortedCards={sortedSeven}
            />
          )}

          <CostChartCell
            hideRightBorder
            color={color}
            sortedCards={cardsSortedByColor}
          />
        </View>
      ))}
    </Box>
  );
}
