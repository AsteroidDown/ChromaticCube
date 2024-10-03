import { MTGColor } from "@/constants/mtg/mtg-colors";
import { DashboardItemSize } from "@/models/dashboard/dashboard";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import React from "react";
import { ViewProps } from "react-native";
import Box from "../ui/box/box";
import CostChartLayout from "./cost-chart-layout";
import RarityChartLayout from "./rarity-chart-layout";

export type ChartType = "cost" | "rarity" | "type";

export type ChartProps = ViewProps & {
  type: ChartType;
  size?: DashboardItemSize;
  filters: CardFilters;
};

export default function Chart({ type, size = "md", filters }: ChartProps) {
  return (
    <Box
      className={`flex-1 flex self-stretch min-w-full !p-0 !bg-background-100 border-2 border-background-300 overflow-hidden ${
        size === "sm"
          ? "lg:min-w-[25%] lg:max-w-[33%]"
          : size === "md"
          ? "lg:min-w-[50%] lg:max-w-[66%]"
          : "lg:min-w-[100%]"
      }`}
    >
      {type === "cost" && <CostChartLayout filters={filters} />}
      {type === "rarity" && <RarityChartLayout filters={filters} />}
    </Box>
  );
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
