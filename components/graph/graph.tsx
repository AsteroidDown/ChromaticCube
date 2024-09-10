import { Text, View, ViewProps } from "react-native";
import { GraphHorizontalAxis } from "./layout/graph-horizontal-axis";
import { GraphPlot, SetData } from "./layout/graph-plot";
import { GraphVerticalAxis } from "./layout/graph-vertical-axis";

export type GraphProps = ViewProps & {
  title?: string;
  horizontalTitle?: string;
  verticalTitle?: string;
  sets: SetData[];
  stacked?: boolean;
};

export function Graph({
  title,
  sets,
  verticalTitle,
  horizontalTitle,
  stacked = true,
  className,
}: GraphProps) {
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

  const verticalTickLength = ceiling > 12 ? 5 : 2;

  return (
    <View
      className={
        className +
        " flex-1 grid grid-areas-graphLayout grid-cols-graphLayout grid-rows-graphLayout grid-flow-dense overflow-auto"
      }
    >
      <Text className="text-white font-bold text-xl w-full text-center p-4 grid-in-title">
        {title}
      </Text>

      <View className="grid-in-verticalAxis pr-2">
        <GraphVerticalAxis
          title={verticalTitle}
          ceiling={ceiling}
          tickLength={verticalTickLength}
        ></GraphVerticalAxis>
      </View>

      <View className="grid-in-plot">
        <GraphPlot
          sets={sets}
          ceiling={ceiling}
          stacked={stacked}
          yTickLength={verticalTickLength}
        ></GraphPlot>
      </View>

      <View className="grid-in-horizontalAxis">
        <GraphHorizontalAxis
          sets={sets}
          title={horizontalTitle}
        ></GraphHorizontalAxis>
      </View>
    </View>
  );
}
export { SetData };
