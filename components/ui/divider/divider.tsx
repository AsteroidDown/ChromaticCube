import { View } from "react-native";

export interface DividerProps {
  vertical?: boolean;
}

export default function Divider({ vertical = false }: DividerProps) {
  return (
    <View
      className={
        "border-background-100 " +
        (vertical ? "border-l h-full" : "border-b w-full")
      }
    ></View>
  );
}
