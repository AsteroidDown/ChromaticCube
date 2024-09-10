import { View } from "react-native";
import { Bar, BarData } from "../bar/bar";

export interface SetData {
  title: string;
  data: BarData[];
}

export interface GraphPlotProps {
  sets: SetData[];
  ceiling: number;
  yTickLength: number;
  stacked?: boolean;
}

export function GraphPlot({
  sets,
  ceiling,
  yTickLength,
  stacked = true,
}: GraphPlotProps) {
  const verticalTickCount = ceiling / yTickLength;

  const verticalTicks = Array(verticalTickCount + 1)
    .fill(0)
    .map((_tick, index) => index * yTickLength);

  return (
    <View className="flex flex-row flex-1 h-full border-b-background-600 border-b border-l-background-600 border-l">
      {
        <View className="justify-between absolute w-full h-full">
          {verticalTicks.map((tick) => (
            <View key={tick} className="border-b border-background-300"></View>
          ))}
        </View>
      }

      <View className="flex flex-row flex-1 w-full justify-between">
        {sets.map((set, index) => (
          <View
            key={set.title + index}
            className="flex flex-1 justify-end h-full items-center animate-bottomToTopGrow mt-auto"
          >
            <Bar data={set.data} ceiling={ceiling} stacked={stacked}></Bar>
          </View>
        ))}
      </View>
    </View>
  );
}
