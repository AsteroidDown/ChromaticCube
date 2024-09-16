import { View } from "react-native";
import { Bar, BarData } from "../bar/bar";

export interface SetData {
  title: string;
  data: BarData[];
}

export interface GraphPlotProps {
  sets: SetData[];
  ceiling: number;
  numVerticalTicks: number;
  stacked?: boolean;
  barsVertical: boolean;
}

export function GraphPlot({
  sets,
  ceiling,
  numVerticalTicks,
  stacked = true,
  barsVertical,
}: GraphPlotProps) {
  const verticalTickIterator: number[] = Array.from(
    { length: numVerticalTicks },
    (_, index) => index
  );

  return (
    <View className={`w-full h-full flex ${barsVertical ? "border-b-background-600 border-b" : "border-l border-l-background-600"}`}>

      {/* background graph lines */}
      <View className={`justify-between w-full h-full ${barsVertical ? "flex-col" : "flex-row"}`}>
        {verticalTickIterator.map((tick) => (
          <View key={tick} className={`${barsVertical ? "border-b" : "border-l h-full"} border-background-300`}></View>
        ))}
      </View>

      <View className={`absolute flex h-full w-full justify-between ${barsVertical ? "flex-row" : "flex-col"}`}>
        {sets.map((set, index) => (
          <View
            key={set.title + index}
            className="flex flex-1 items-center"
          >
            <Bar
              data={set.data}
              ceiling={ceiling}
              stacked={stacked}
              className={barsVertical ? "h-full w-4/5 mx-auto justify-end" : "w-full h-4/5 my-auto"}
              barsVertical={barsVertical}
              barStyle={barsVertical ? "absolute bottom-0 w-full h-full rounded-t-lg bg-gradient-to-t animate-bottomToTopGrow" : "absolute left-0 w-full h-full rounded-r-lg bg-gradient-to-r animate-leftToRightGrow"}
            ></Bar>
          </View>
        ))}
      </View>
    </View>
  );
}
