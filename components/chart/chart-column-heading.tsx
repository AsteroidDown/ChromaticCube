import { View } from "react-native";
import Text from "../ui/text/text";

export interface ChartColumnHeadingProps {
  title: string;
  large?: boolean;
  double?: boolean;
}

export default function ChartColumnHeading({
  title,
  large = false,
  double = false,
}: ChartColumnHeadingProps) {
  return (
    <View className={`flex-1 ${large ? "h-24" : "h-14"}`}>
      <View
        className={`${
          double ? "border-l-2" : "border-l"
        } absolute h-full -ml-px border-background-300 rotate-[12deg] origin-bottom-left`}
      ></View>

      <View className="absolute flex justify-end items-center w-full h-full left-[50%] translate-x-[-50%]">
        <Text
          noWrap
          className="absolute w-full left-[50%] rotate-[-78deg] md:translate-x-[7%] translate-x-[25%] bottom-1 origin-bottom-left"
        >
          {title}
        </Text>
      </View>
    </View>
  );
}
