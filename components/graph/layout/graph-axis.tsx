import { useState } from "react";
import { Text, View, ViewProps } from "react-native";

type GraphAxisProps = ViewProps & {
  title?: string;
  labels?: string[];
  vertical: boolean; // axis is vertical if true, horizontal if false
  isNumCardsLabels: boolean;
};

export function GraphAxis({ title, labels, vertical, isNumCardsLabels }: GraphAxisProps) {
  const [isWidthSmall, setIsWidthSmall] = useState(false);
  const smallWidth = labels ? labels.join("").length * 16 : 0;

  const axisView = vertical ? 
  // vertical view
  (
    <View className="flex flex-row h-full">
      <View className="justify-center">
        <Text className="text-white text-nowrap text-center md:-rotate-90">
          {title}
        </Text>
      </View>

      <View className={`${isNumCardsLabels ? "justify-between" : "justify-around"} w-full h-full flex-col flex-1`}>
        {labels &&
          labels.map((label) => (
            <Text key={label} className="text-white text-nowrap text-center">
              {label}
            </Text>
          ))}
      </View>
    </View>
  ) :
  // horizontal view
  (
    <View
      className="flex gap-2"
      onLayout={(event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setIsWidthSmall(smallWidth ? width < smallWidth : false);
      }}
    >
      <View className="flex flex-row justify-between">
        {labels &&
          labels.map((label, index) => (
            <View
              className={`${isNumCardsLabels ? "" : "min-w-12 flex-1"} ${isWidthSmall ? "rotate-12" : ""}`}
              key={label + index}
            >
              <Text className={`text-center text-white text-nowrap`}>
                {label}
              </Text>
            </View>
          ))}
      </View>
      
      {title && (
        <Text className="w-full text-center text-white text-nowrap">
          {title}
        </Text>
      )}
    </View>
  );

  return axisView;
}