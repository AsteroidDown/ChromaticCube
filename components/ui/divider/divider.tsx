import { View, ViewProps } from "react-native";

export type DividerProps = ViewProps & {
  classes?: string;
  thick?: boolean;
  vertical?: boolean;
};

export default function Divider({
  classes,
  thick = false,
  vertical = false,
}: DividerProps) {
  return (
    <View
      className={
        classes +
        " border-background-100 " +
        (vertical
          ? " h-full " + (thick ? "border-x" : "border-l")
          : " w-full " + (thick ? "border-y" : "border-b"))
      }
    ></View>
  );
}
