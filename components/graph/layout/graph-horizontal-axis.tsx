import Text from "@/components/ui/text/text";
import { View } from "react-native";
import { SetData } from "./graph-plot";

export interface GraphHorizontalAxisProps {
  title?: string;
  sets: SetData[];
}

export function GraphHorizontalAxis({ title, sets }: GraphHorizontalAxisProps) {
  return (
    <View className="flex gap-4 pt-2 pb-4">
      <View className="flex flex-row">
        {sets.map((set, index) => (
          <View className="min-w-24" key={set.title + index}>
            <Text noWrap center>
              {set.title}
            </Text>
          </View>
        ))}
      </View>

      {title && (
        <Text center noWrap className="text-nowrap">
          {title}
        </Text>
      )}
    </View>
  );
}
