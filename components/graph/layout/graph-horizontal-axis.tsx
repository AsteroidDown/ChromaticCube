import { Text, View } from "react-native";
import { SetData } from "./graph-plot";

export interface GraphHorizontalAxisProps {
  title?: string;
  sets: SetData[];
}

export function GraphHorizontalAxis({ title, sets }: GraphHorizontalAxisProps) {
  return (
    <View className="flex gap-4 px-6 pt-2 pb-4">
      <View className="flex flex-row">
        {sets.map((set, index) => (
          <View className="min-w-24" key={set.title + index}>
            <Text className="text-center text-white text-nowrap">
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
