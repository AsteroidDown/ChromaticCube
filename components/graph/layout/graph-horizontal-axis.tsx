import { Text, View } from "react-native";
import { SetData } from "./graph-plot";

export interface GraphHorizontalAxisProps {
  title?: string;
  sets: SetData[];
}

export function GraphHorizontalAxis({ title, sets }: GraphHorizontalAxisProps) {
  return (
    <View className="flex gap-2 flex-1 px-4 pt-2 pb-4">
      <View className="flex flex-row gap-2">
        {sets.map((set, index) => (
          <View className="flex-1 " key={set.title + index}>
            <Text className="w-full text-center text-white text-nowrap">
              {set.title}
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
}
