import { DimensionValue } from "react-native";
import { MTGColor } from "../../../constants/mtg/mtg-colors";
import { GroupedBarLayout } from "./grouped-bar-layout";
import { StackedBarLayout } from "./stacked-bar-layout";

export interface BarData {
  name: string;
  count: number;
  color?: MTGColor;
}

export interface BarProps {
  data: BarData[];
  ceiling: number;
  stacked?: boolean;
}

export function Bar({ data, ceiling, stacked = true }: BarProps) {
  if (stacked) {
    const total = data.reduce((acc, entry) => acc + entry.count, 0);

    const topSpace = (ceiling - total) / ceiling;
    const barSpace = 1 - topSpace;

    const topHeight: DimensionValue = `${topSpace * 100}%`;
    const barHeight: DimensionValue = `${barSpace * 100}%`;
    return StackedBarLayout({ data, total, topHeight, barHeight });
  } else {
    return GroupedBarLayout({ data, ceiling });
  }
}
