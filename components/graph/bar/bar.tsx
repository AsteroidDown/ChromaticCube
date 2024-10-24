import { MTGColor } from "@/constants/mtg/mtg-colors";
import { MTGRarity } from "@/constants/mtg/mtg-rarity";
import { Card } from "@/models/card/card";
import { DimensionValue } from "react-native";
import { GroupedBarLayout } from "./grouped-bar-layout";
import { StackedBarLayout } from "./stacked-bar-layout";

export interface BarData {
  name: string;
  cards: Card[];
  color?: MTGColor;
}

export interface BarProps {
  data: BarData[];
  ceiling: number;
  stacked?: boolean;
  cost?: number;
  rarity?: MTGRarity;
  type?: string;
}

export function Bar({
  data,
  ceiling,
  stacked = true,
  cost,
  rarity,
  type,
}: BarProps) {
  if (stacked) {
    const total = data.reduce(
      (acc, entry) =>
        acc + entry.cards.reduce((acc, card) => acc + card.count, 0),
      0
    );

    const topSpace = (ceiling - total) / ceiling;
    const barSpace = 1 - topSpace;

    const topHeight: DimensionValue = `${topSpace * 100}%`;
    const barHeight: DimensionValue = `${barSpace * 100}%`;
    return StackedBarLayout({
      data,
      total,
      topHeight,
      barHeight,
      cost,
      rarity,
      type,
    });
  } else {
    return GroupedBarLayout({ data, ceiling, cost, rarity, type });
  }
}
