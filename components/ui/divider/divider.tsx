import { View, ViewProps } from "react-native";

export type DividerProps = ViewProps & {
  thick?: boolean;
  vertical?: boolean;
};

export default function Divider({
  thick = false,
  vertical = false,
}: DividerProps) {
  return (
    <View
      className={
        "border-background-100 " +
        (vertical
          ? " h-full " + (thick ? "border-x" : "border-l")
          : " w-full " + (thick ? "border-y" : "border-b"))
      }
    ></View>
  );
}
