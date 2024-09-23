import Text from "@/components/ui/text/text";
import { View } from "react-native";

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

  const ticks = Array(tickCount + 1)
    .fill(0)
    .map((_tick, index) => index * tickLength);

  ticks.reverse();

  return (
    <View className="flex flex-row h-full">
      <View className="justify-center">
        <Text noWrap center className="md:-rotate-90">
          {title}
        </Text>
      </View>

      <View className="justify-between">
        {ticks.map((tick) => (
          <Text noWrap center key={tick} className="text-center">
            {tick}
          </Text>
        ))}
      </View>
    </View>
  );
}
