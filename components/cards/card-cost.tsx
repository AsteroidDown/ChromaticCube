import { Image, View } from "react-native";
import { SymbolMap } from "../../constants/symbols";

export interface CardCostProps {
  cost: string;
  size?: "sm" | "md" | "lg";
}

export default function CardCost({ cost, size = "md" }: CardCostProps) {
  const costs = cost.substring(1, cost.length - 1).split("}{");
  const symbols = costs.map((manaCost) => SymbolMap.get("{" + manaCost + "}"));

  return (
    <View className="flex flex-row gap-1">
      {symbols.map((symbol, index) => (
        <Image
          className={
            size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6"
          }
          source={{ uri: symbol }}
          key={(symbol || "") + index}
        />
      ))}
    </View>
  );
}
