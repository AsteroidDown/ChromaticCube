import { DimensionValue, View } from "react-native";
import { MTGColor } from "../../../constants/colors";
import { BarData } from "./bar";

interface StackedBarViewProps {
  data: BarData[];
  total: number;
  topHeight: DimensionValue;
  barHeight: DimensionValue;
}

export function StackedBarView({
  data,
  total,
  topHeight,
  barHeight,
}: StackedBarViewProps) {
  const greenHeight = getStackHeight("green", total, data);
  const redHeight = getStackHeight("red", total, data, greenHeight);
  const blackHeight = getStackHeight("black", total, data, redHeight);
  const blueHeight = getStackHeight("blue", total, data, blackHeight);
  const whiteHeight = getStackHeight("white", total, data, blueHeight);

  const baseClass = "absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t";

  return (
    <View className="flex w-10 h-56 border-white">
      <View style={[{ height: topHeight }]}></View>

      <View className="flex w-full" style={[{ height: barHeight }]}>
        <View
          className={`${baseClass} to-mtg-white from-mtg-white-secondary`}
          style={[{ height: `${whiteHeight}%` }]}
        ></View>
        <View
          className={`${baseClass} to-mtg-blue from-mtg-blue-secondary`}
          style={[{ height: `${blueHeight}%` }]}
        ></View>
        <View
          className={`${baseClass} to-mtg-black from-mtg-black-secondary`}
          style={[{ height: `${blackHeight}%` }]}
        ></View>
        <View
          className={`${baseClass} to-mtg-red from-mtg-red-secondary`}
          style={[{ height: `${redHeight}%` }]}
        ></View>
        <View
          className={`${baseClass} to-mtg-green from-mtg-green-secondary`}
          style={[{ height: `${greenHeight}%` }]}
        ></View>
      </View>
    </View>
  );
}

function getStackHeight(
  color: MTGColor,
  total: number,
  data: BarData[],
  previousValue?: number
) {
  return (
    ((data.find((entry) => entry.color === color)?.count || 0) / total) * 100 +
    (previousValue || 0)
  );
}
