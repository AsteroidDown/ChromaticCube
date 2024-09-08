import { Text, View } from "react-native";

export interface GraphVerticalAxisProps {
  title?: string;
  ceiling: number;
  tickLength: number;
}

export function GraphVerticalAxis({
  title,
  ceiling,
  tickLength,
}: GraphVerticalAxisProps) {
  const tickCount = ceiling / tickLength;

  const ticks = Array(tickCount+1)
    .fill(0)
    .map((_tick, index) => index * tickLength);

  ticks.reverse();

  return (
    <View className="flex flex-row h-full">
      <View className="justify-center">
        <Text className="text-white text-nowrap text-center md:-rotate-90">{title}</Text>
      </View>

      <View className="justify-between">
        {ticks.map((tick) => (
          <Text
            key={tick}
            className="text-white text-nowrap text-center"
          >
            {tick}
          </Text>
        ))}
      </View>
    </View>
  );
}
