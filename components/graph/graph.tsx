import { View } from "react-native";
import { GraphLayout, SetData } from "./layout/graph-layout";

export interface GraphProps {
  title?: string;
  horizontalTitle?: string;
  data: SetData[];
}

export function Graph({ title, horizontalTitle, data }: GraphProps) {
  return (
    <View className="px-6 py-3 rounded-lg bg-background-200">
      <GraphLayout
        sets={data}
        title={title}
        horizontalTitle={horizontalTitle}
      ></GraphLayout>
    </View>
  );
}
