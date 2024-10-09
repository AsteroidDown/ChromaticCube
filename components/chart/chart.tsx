import { MTGColor } from "@/constants/mtg/mtg-colors";
import {
  sortCardsAlphabetically,
  sortCardsByManaValue,
} from "@/functions/card-sorting";
import { Card } from "@/models/card/card";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import React, { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import DashboardItemHeader from "../dashboard/dashboard-item-header";
import Placeholder from "../ui/placeholder/placeholder";
import CostChartLayout from "./cost-chart-layout";
import RarityChartLayout from "./rarity-chart-layout";
import TypeChartLayout from "./type-chart-layout";

export type ChartType = "cost" | "rarity" | "type";

export type ChartProps = ViewProps & {
  id: string;
  sectionId: string;
  cards: Card[];
  title: string;
  titleStart?: ReactNode;
  titleEnd?: ReactNode;
  type: ChartType;
  filters: CardFilters;
  smallTitles?: boolean;
};

export default function Chart({
  id,
  sectionId,
  cards,
  title,
  titleStart,
  titleEnd,
  type,
  filters,
  smallTitles = false,
}: ChartProps) {
  const sortedCards = sortCardsByManaValue(sortCardsAlphabetically(cards));

  if (type === "cost")
    return (
      <View className="flex w-full h-full">
        <DashboardItemHeader
          className="my-2 px-4"
          itemId={id}
          sectionId={sectionId}
          title={title}
          titleEnd={titleEnd}
          titleStart={titleStart}
        />

        <CostChartLayout
          cards={sortedCards}
          filters={filters}
          smallTitles={smallTitles}
        />
      </View>
    );
  else if (type === "rarity")
    return (
      <View className="flex w-full h-full">
        <DashboardItemHeader
          className="my-2 px-4"
          itemId={id}
          sectionId={sectionId}
          title={title}
          titleEnd={titleEnd}
          titleStart={titleStart}
        />

        <RarityChartLayout
          cards={sortedCards}
          filters={filters}
          smallTitles={smallTitles}
        />
      </View>
    );
  else if (type === "type")
    return (
      <View className="flex w-full h-full">
        <DashboardItemHeader
          className="my-2 px-4"
          itemId={id}
          sectionId={sectionId}
          title={title}
          titleEnd={titleEnd}
          titleStart={titleStart}
        />

        <TypeChartLayout
          cards={sortedCards}
          filters={filters}
          smallTitles={smallTitles}
        />
      </View>
    );
  else return <Placeholder title="No Chart Found!" />;
}

export function getCellBackgroundColor(color: MTGColor) {
  switch (color) {
    case "white":
      return "bg-mtg-white bg-opacity-10";
    case "blue":
      return "bg-mtg-blue bg-opacity-10";
    case "black":
      return "bg-mtg-black bg-opacity-10";
    case "red":
      return "bg-mtg-red bg-opacity-10";
    case "green":
      return "bg-mtg-green bg-opacity-10";
    case "gold":
      return "bg-mtg-gold bg-opacity-10";
    case "colorless":
      return "bg-mtg-colorless bg-opacity-10";
    case "land":
      return "bg-mtg-land bg-opacity-10";
  }
}
