import { DimensionValue, View } from "react-native";
import { MTGColor } from "../../../constants/colors";
import { StackedBarView } from "./stacked-bar-view";

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
  const total = data.reduce((acc, entry) => acc + entry.count, 0);

  const topSpace = (ceiling - total) / ceiling;
  const barSpace = 1 - topSpace;

  const topHeight: DimensionValue = `${topSpace * 100}%`;
  const barHeight: DimensionValue = `${barSpace * 100}%`;

  if (stacked) {
    return StackedBarView({ data, total, topHeight, barHeight });
  } else {
    return (
      <View className="flex w-10 h-56 border border-white">
        <View style={[{ height: topHeight }]}></View>

        <View style={[{ height: barHeight }]}>
          <View className="w-full h-full bg-mtg-blue"></View>
        </View>
      </View>
    );
  }
}
