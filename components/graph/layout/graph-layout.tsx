import { Text, View } from "react-native";
import { GraphHorizontalAxis } from "./graph-horizontal-axis";
import { GraphPlot, SetData } from "./graph-plot";
import { GraphVerticalAxis } from "./graph-vertical-axis";

export interface GraphLayoutProps {
  title?: string;
  horizontalTitle?: string;
  sets: SetData[];
  stacked?: boolean;
}

export function GraphLayout({
  title,
  horizontalTitle,
  sets,
  stacked = true,
}: GraphLayoutProps) {
  const maxValue = sets.reduce((acc, set) => {
    const setValue = stacked
      ? set.data.reduce((acc, entry) => acc + entry.count, 0)
      : set.data.reduce((acc, entry) => {
          if (entry.count > acc) return entry.count;
          return acc;
        }, 0);

    if (setValue > acc) return setValue;
    return acc;
  }, 0);

  const ceiling =
    maxValue > 10
      ? Math.ceil(maxValue / 5) * 5
      : Math.ceil(maxValue / 2) * 2 + 2;

  const tickLength = ceiling > 10 ? 5 : 2;

  return (
    <View className="flex min-w-fit">
      <View className="flex flex-row">
        <Text className="text-white w-full text-center p-4">{title}</Text>
      </View>

      <View className="flex flex-row">
        <GraphVerticalAxis
          ceiling={ceiling}
          tickLength={tickLength}
        ></GraphVerticalAxis>

        <GraphPlot
          sets={sets}
          ceiling={ceiling}
          tickLength={tickLength}
          stacked={stacked}
        ></GraphPlot>

        <View className="w-10 h-full"></View>
      </View>

      <View className="flex flex-row">
        <View className="w-10 h-full"></View>

        <GraphHorizontalAxis
          title={horizontalTitle}
          sets={sets}
        ></GraphHorizontalAxis>

        <View className="w-10 h-full"></View>
      </View>
    </View>
  );
}
export { SetData };
