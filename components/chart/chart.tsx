import { MTGColor } from "@/constants/mtg/mtg-colors";
import { DashboardItemSize } from "@/models/dashboard/dashboard";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import React from "react";
import { View, ViewProps } from "react-native";
import ChartCostLayout from "./cost-chart-layout";

export type ChartType = "cost" | "rarity" | "type";

export type ChartProps = ViewProps & {
  type: ChartType;
  size?: DashboardItemSize;
  filters: CardFilters;
};

export default function Chart({ type, size = "md", filters }: ChartProps) {
  if (type === "cost") return <ChartCostLayout filters={filters} size={size} />;

  return <View className="flex flex-1 overflow-hidden"></View>;
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
