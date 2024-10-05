import { titleCase } from "@/functions/text-manipulation";
import { View } from "react-native";
import Text from "../ui/text/text";

export interface ChartColumnHeadingProps {
  title: string;
  large?: boolean;
  double?: boolean;
  smallTitles?: boolean;
}

export default function ChartColumnHeading({
  title,
  large = false,
  double = false,
  smallTitles = false,
}: ChartColumnHeadingProps) {
  return (
    <View
      className={`flex-1 ${
        smallTitles ? "h-10" : large ? "h-[110px]" : "h-16"
      }`}
    >
      <View
        className={`${
          double ? "border-l-2" : "border-l"
        } absolute h-full -ml-px border-background-300 rotate-[12deg] translate-y-px origin-bottom-left`}
      ></View>

      <View
        className={`absolute flex items-center w-full h-full left-[50%] translate-x-[-50%] ${
          smallTitles ? "justify-center" : "justify-end"
        }`}
      >
        <Text
          noWrap
          className={`${
            !smallTitles
              ? "absolute w-full bottom-2 left-[50%] rotate-[-78deg] md:translate-x-[10px] translate-x-[25%] origin-bottom-left"
              : "w-fit ml-2"
          }`}
        >
          {smallTitles ? titleCase(title.substring(0, 1)) : title}
        </Text>
      </View>
    </View>
  );
}
