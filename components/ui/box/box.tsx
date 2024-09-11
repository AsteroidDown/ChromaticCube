import { View, ViewProps } from "react-native";

export type BoxProps = ViewProps & {
  shade?: 100 | 200 | 300 | 400 | 500 | 600;
};

export default function Box({
  shade = 200,
  style,
  className,
  children,
}: BoxProps) {
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
    <View
      style={style}
      className={`${className} rounded-2xl py-4 px-6 ${backgroundShade}`}
    >
      {children}
    </View>
  );
}
