import { MTGColor } from "@/constants/mtg/mtg-colors";
import {
  sortCardsAlphabetically,
  sortCardsByManaValue,
} from "@/functions/card-sorting";
import { getLocalStorageStoredCards } from "@/functions/local-storage/card-local-storage";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import React from "react";
import { ViewProps } from "react-native";
import Placeholder from "../ui/placeholder/placeholder";
import CostChartLayout from "./cost-chart-layout";
import RarityChartLayout from "./rarity-chart-layout";
import TypeChartLayout from "./type-chart-layout";

export type ChartType = "cost" | "rarity" | "type";

export type ChartProps = ViewProps & {
  type: ChartType;
  filters: CardFilters;
};

export default function Chart({ type, filters }: ChartProps) {
  const cards = sortCardsByManaValue(
    sortCardsAlphabetically(getLocalStorageStoredCards())
  );

  if (type === "cost")
    return <CostChartLayout cards={cards} filters={filters} />;
  else if (type === "rarity")
    return <RarityChartLayout cards={cards} filters={filters} />;
  else if (type === "type")
    return <TypeChartLayout cards={cards} filters={filters} />;
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
