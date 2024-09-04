import { View } from "react-native";
import { Bar, BarData } from "../bar/bar";

export interface SetData {
  title: string;
  data: BarData[];
}

export interface GraphPlotProps {
  sets: SetData[];
  ceiling: number;
  stacked?: boolean;
}

export function GraphPlot({ ceiling, sets, stacked = true }: GraphPlotProps) {
  const tickLength = ceiling > 10 ? 5 : 2;
  const tickCount = ceiling / tickLength;

  const ticks = Array(tickCount)
    .fill(0)
    .map((_tick, index) => index * tickLength + tickLength);

  return (
    <View className="flex flex-row px-6 gap-6 border-b-background-600 border-b border-l-background-600 border-l">
      <View className="absolute w-full h-full -ml-6">
        {ticks.map((tick) => (
          <View
            key={tick}
            className="absolute right-0 w-full border-b border-background-300"
            style={{
              transform: [{ translateY: `${50}%` }],
              bottom: `${(tick / ceiling) * 100}%`,
            }}
          ></View>
        ))}
      </View>

      {sets.map((set, index) => (
        <View key={set.title + index}>
          <Bar data={set.data} ceiling={ceiling} stacked={stacked}></Bar>
        </View>
      ))}
    </View>
  );
}
