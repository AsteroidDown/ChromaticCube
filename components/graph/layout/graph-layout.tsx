import { Text, View } from "react-native";
import { GraphHorizontalAxis } from "./graph-horizontal-axis";
import { GraphPlot, SetData } from "./graph-plot";
import { GraphVerticalAxis } from "./graph-vertical-axis";

export interface GraphLayoutProps {
  title?: string;
  horizontalTitle?: string;
  verticalTitle?: string;
  sets: SetData[];
  stacked?: boolean;
}

export function GraphLayout(graphLayoutProps: GraphLayoutProps) {
  const maxValue = graphLayoutProps.sets.reduce((acc, set) => {
    const setValue = graphLayoutProps.stacked
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

  const yTickLength = ceiling > 12 ? 5 : 2;

  return (
    <View className="grid grid-areas-graphLayout grid-cols-graphLayout grid-rows-graphLayout grid-flow-dense overflow-auto">
      <Text className="text-white w-full text-center p-4 grid-in-title">{graphLayoutProps.title}</Text>
      
      <View className="grid-in-verticalAxis pr-1 min-w-max">
        <GraphVerticalAxis
          title={graphLayoutProps.verticalTitle}
          ceiling={ceiling}
          tickLength={yTickLength}
        ></GraphVerticalAxis>
      </View>

      <View className="grid-in-plot">
        <GraphPlot
          sets={graphLayoutProps.sets}
          ceiling={ceiling}
          yTickLength={yTickLength}
          stacked={graphLayoutProps.stacked}
        ></GraphPlot>
      </View>

      <View className="grid-in-horizontalAxis">
        <GraphHorizontalAxis
          title={graphLayoutProps.horizontalTitle}
          sets={graphLayoutProps.sets}
        ></GraphHorizontalAxis>
      </View>
    </View>
  );
}
export { SetData };
