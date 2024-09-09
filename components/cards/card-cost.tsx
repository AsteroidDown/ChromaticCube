import { Image, View } from "react-native";
import { SymbolMap } from "../../constants/mtg/mtg-symbols";
import { Size } from "../../constants/ui/sizes";

export interface CardCostProps {
  cost: string;
  size?: Size;
}

export default function CardCost({ cost, size = "md" }: CardCostProps) {
  const costs = cost.substring(1, cost.length - 1).split("}{");
  const symbols = costs.map((manaCost) => SymbolMap.get("{" + manaCost + "}"));

  return (
    <View
      className={
        "flex flex-row " +
        (size === "sm" || size === "xs" ? "gap-[2px]" : "gap-1")
      }
    >
      {symbols.map((symbol, index) => (
        <Image
          className={
            size === "xs"
              ? "h-3 w-3"
              : size === "sm"
              ? "h-4 w-4"
              : size === "md"
              ? "h-5 w-5"
              : size === "lg"
              ? "h-6 w-6"
              : "h-7 w-7"
          }
          source={{ uri: symbol }}
          key={(symbol || "") + index}
        />
      ))}
    </View>
  );
}
