import { Text, View } from "react-native";
import { Bar, BarData } from "../bar/bar";

export interface GraphLayoutProps {
  data: BarData[][];
  stacked?: boolean;
}

export function GraphLayout({ data, stacked = true }: GraphLayoutProps) {
  const maxValue = data.reduce((acc, set) => {
    const setValue = set.reduce((acc, entry) => acc + entry.count, 0);

    if (setValue > acc) return setValue;
    return acc;
  }, 0);

  const ceiling = Math.ceil(maxValue / 5) * 5;

  console.log(maxValue, ceiling);

  return (
    <View className="flex">
      <View className="flex flex-row">
        <Text className="text-white w-full text-center p-4">Graph Title</Text>
      </View>

      <View className="flex flex-row">
        <GraphVerticalAxis ceiling={ceiling}></GraphVerticalAxis>

        <GraphPlot data={data} ceiling={ceiling}></GraphPlot>

        <View className="w-10 h-full"></View>
      </View>

      <View className="flex flex-row">
        <View className="w-10 h-full"></View>

        <GraphHorizontalAxis></GraphHorizontalAxis>

        <View className="w-10 h-full"></View>
      </View>
    </View>
  );
}

export interface GraphVerticalAxisProps {
  ceiling: number;
}

export function GraphVerticalAxis({ ceiling }: GraphVerticalAxisProps) {
  return (
    <View className="w-10 h-full border-r-white border-r">
      <Text
        className="absolute top-0 right-0 w-full text-center text-white"
        style={{
          transform: [{ translateY: `${-50}%` }],
        }}
      >
        {ceiling}
      </Text>

      <Text
        className="absolute bottom-0 right-0 w-full text-center text-white"
        style={{
          transform: [{ translateY: `${50}%` }],
        }}
      >
        0
      </Text>
    </View>
  );
}

export interface GraphHorizontalAxisProps {
  title?: string;
}

export function GraphHorizontalAxis({}: GraphHorizontalAxisProps) {
  return (
    <View className="h-10 flex-1 border-t-white border-t">
      {/* <Text
        className="absolute top-0 right-0 w-full text-center text-white"
        style={{
          transform: [{ translateY: `${-50}%` }],
        }}
      >
        {ceiling}
      </Text>

      <Text
        className="absolute bottom-0 right-0 w-full text-center text-white"
        style={{
          transform: [{ translateY: `${50}%` }],
        }}
      >
        0
      </Text> */}
    </View>
  );
}

export interface GraphPlotProps {
  data: BarData[][];
  ceiling: number;
}

export function GraphPlot({ ceiling, data }: GraphPlotProps) {
  return (
    <View className="flex flex-row mx-6 gap-6">
      {data.map((set, index) => (
        <View key={set[0].name + index}>
          <Bar data={set} ceiling={ceiling}></Bar>
        </View>
      ))}
    </View>
  );
}
