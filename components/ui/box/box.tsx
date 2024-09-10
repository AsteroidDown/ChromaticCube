import { View, ViewProps } from "react-native";

export type BoxProps = ViewProps & {
  shade?: 100 | 200 | 300 | 400 | 500 | 600;
};

export default function Box({ className, shade = 200, children }: BoxProps) {
  const backgroundShade =
    shade === 100
      ? "bg-background-100"
      : shade === 300
      ? "bg-background-300"
      : shade === 400
      ? "bg-background-400"
      : shade === 500
      ? "bg-background-100"
      : "bg-background-200";

  return (
    <View className={`${className} rounded-2xl py-4 px-6 ${backgroundShade}`}>
      {children}
    </View>
  );
}
