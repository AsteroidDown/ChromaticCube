import { View } from "react-native";
import { GraphLayout, GraphLayoutProps } from "./layout/graph-layout";


export interface GraphProps {
  graphLayoutProps: GraphLayoutProps
}

export function Graph({
  graphLayoutProps: graphLayoutProps
}: GraphProps) {
  return (
    <View className="px-6 py-3 rounded-lg bg-background-200">
      <GraphLayout
        {...graphLayoutProps}
      ></GraphLayout>
    </View>
  );
}
