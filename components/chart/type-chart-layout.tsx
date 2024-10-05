import { sortCardsByColor, sortCardsByType } from "@/functions/card-sorting";
import { titleCase } from "@/functions/text-manipulation";
import { Card } from "@/models/card/card";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import React from "react";
import { View } from "react-native";
import Text from "../ui/text/text";
import { getCellBackgroundColor } from "./chart";
import ChartCell from "./chart-cell";
import ChartColumnHeading from "./chart-column-heading";

interface TypeChartLayoutProps {
  cards: Card[];
  filters: CardFilters;
  smallTitles?: boolean;
}

export default function TypeChartLayout({
  cards,
  filters,
  smallTitles = false,
}: TypeChartLayoutProps) {
  const colors = filters.colorFilter;

  const sortedCards = sortCardsByType(cards);
  const cardsSortedByColor = sortCardsByColor(cards);

  const sortedCreature = sortCardsByColor(sortedCards.creature);
  const sortedInstant = sortCardsByColor(sortedCards.instant);
  const sortedSorcery = sortCardsByColor(sortedCards.sorcery);
  const sortedArtifact = sortCardsByColor(sortedCards.artifact);
  const sortedEnchantment = sortCardsByColor(sortedCards.enchantment);
  const sortedLand = sortCardsByColor(sortedCards.land);
  const sortedPlans = sortCardsByColor(sortedCards.planeswalker);
  const sortedBattle = sortCardsByColor(sortedCards.battle);

  return (
    <>
      <View className="flex flex-row w-full -mt-1">
        <View className="w-24"></View>

        <ChartColumnHeading large smallTitles={smallTitles} title="Creature" />
        <ChartColumnHeading large smallTitles={smallTitles} title="Instant" />
        <ChartColumnHeading large smallTitles={smallTitles} title="Sorcery" />
        <ChartColumnHeading large smallTitles={smallTitles} title="Artifact" />
        <ChartColumnHeading
          large
          smallTitles={smallTitles}
          title="Enchantment"
        />
        <ChartColumnHeading large smallTitles={smallTitles} title="Land" />
        {sortedCards.planeswalker?.length > 0 && (
          <ChartColumnHeading
            large
            smallTitles={smallTitles}
            title="Planeswalker"
          />
        )}
        {sortedCards.battle?.length > 0 && (
          <ChartColumnHeading large smallTitles={smallTitles} title="Battle" />
        )}
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
            type="creature"
            color={color}
            sortedCards={sortedCreature}
          />
          <ChartCell type="instant" color={color} sortedCards={sortedInstant} />
          <ChartCell type="sorcery" color={color} sortedCards={sortedSorcery} />
          <ChartCell
            type="artifact"
            color={color}
            sortedCards={sortedArtifact}
          />
          <ChartCell
            type="enchantment"
            color={color}
            sortedCards={sortedEnchantment}
          />
          <ChartCell type="land" color={color} sortedCards={sortedLand} />
          {sortedCards.planeswalker?.length > 0 && (
            <ChartCell
              type="planeswalker"
              color={color}
              sortedCards={sortedPlans}
            />
          )}
          {sortedCards.battle?.length > 0 && (
            <ChartCell type="battle" color={color} sortedCards={sortedBattle} />
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
