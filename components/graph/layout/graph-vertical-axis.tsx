import { Text, View } from "react-native";

export interface GraphVerticalAxisProps {
  ceiling: number;
}

export function GraphVerticalAxis({ ceiling }: GraphVerticalAxisProps) {
  const tickLength = ceiling > 10 ? 5 : 2;
  const tickCount = ceiling / tickLength;

  const ticks = Array(tickCount)
    .fill(0)
    .map((_tick, index) => index * tickLength);

  return (
    <View className="w-10">
      <Text
        className="absolute top-0 left-0 w-full text-center text-white"
        style={{
          transform: "translateY: -50%",
        }}
      >
        {ceiling}
      </Text>

      {ticks.map((tick) => (
        <Text
          key={tick}
          className="absolute right-0 w-full text-center text-white"
          style={{
            transform: "translateY: 50%",
            bottom: `${(tick / ceiling) * 100}%`,
          }}
        >
          {tick}
        </Text>
      ))}
    </View>
  );
}
