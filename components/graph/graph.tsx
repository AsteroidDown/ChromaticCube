import Text from "@/components/ui/text/text";
import { View, ViewProps } from "react-native";
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

export default function Graph({
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
    maxValue > 45
      ? Math.ceil(maxValue / 10) * 10
      : maxValue > 10
      ? Math.ceil(maxValue / 5) * 5
      : Math.ceil(maxValue / 2) * 2 + 2;

  const verticalTickLength = ceiling > 45 ? 10 : ceiling > 12 ? 5 : 2;

  return (
    <View
      className={`
        ${className} flex flex-1 w-full h-full overflow-auto
      `}
    >
      <Text
        size="xl"
        thickness="bold"
        className="w-full max-h-fit text-center p-4"
      >
        {title}
      </Text>

      <View className="flex-1 flex flex-row">
        <GraphVerticalAxis
          className="w-3 mr-3"
          title={verticalTitle}
          ceiling={ceiling}
          tickLength={verticalTickLength}
        ></GraphVerticalAxis>

        <GraphPlot
          className="flex-[5]"
          sets={sets}
          ceiling={ceiling}
          stacked={stacked}
          yTickLength={verticalTickLength}
        ></GraphPlot>
      </View>

      <GraphHorizontalAxis
        sets={sets}
        title={horizontalTitle}
      ></GraphHorizontalAxis>
    </View>
  );
}
export { SetData };
