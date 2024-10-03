import { sortCardsByColor, sortCardsByCost } from "@/functions/card-sorting";
import { getLocalStorageStoredCards } from "@/functions/local-storage/card-local-storage";
import { titleCase } from "@/functions/text-manipulation";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import React from "react";
import { View } from "react-native";
import Text from "../ui/text/text";
import { getCellBackgroundColor } from "./chart";
import ChartCell from "./chart-cell";
import ChartColumnHeading from "./chart-column-heading";

interface CostChartLayoutProps {
  filters: CardFilters;
}

export default function CostChartLayout({ filters }: CostChartLayoutProps) {
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

  return (
    <>
      <View className="flex flex-row w-full -mt-1">
        <View className="w-24"></View>
        {sortedCards.zero.length > 0 && <ChartColumnHeading title="Zero" />}
        <ChartColumnHeading title="One" />
        <ChartColumnHeading title="Two" />
        <ChartColumnHeading title="Three" />
        <ChartColumnHeading title="Four" />
        <ChartColumnHeading title="Five" />
        <ChartColumnHeading title="Six" />
        {sortedCards.seven.length > 0 && <ChartColumnHeading title="Seven" />}
        <ChartColumnHeading double title="Total" />
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

          {sortedCards.zero.length > 0 && (
            <ChartCell cost={0} color={color} sortedCards={sortedZero} />
          )}
          <ChartCell cost={1} color={color} sortedCards={sortedOne} />
          <ChartCell cost={2} color={color} sortedCards={sortedTwo} />
          <ChartCell cost={3} color={color} sortedCards={sortedThree} />
          <ChartCell cost={4} color={color} sortedCards={sortedFour} />
          <ChartCell cost={5} color={color} sortedCards={sortedFive} />
          <ChartCell cost={6} color={color} sortedCards={sortedSix} />
          {sortedCards.seven?.length > 0 && (
            <ChartCell
              double
              cost={7}
              color={color}
              sortedCards={sortedSeven}
            />
          )}

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
