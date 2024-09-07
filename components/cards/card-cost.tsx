import { Image, View } from "react-native";
import { SymbolMap } from "../../constants/symbols";

export interface CardCostProps {
  cost: string;
}

export default function CardCost({ cost }: CardCostProps) {
  const costs = cost.substring(1, cost.length - 1).split("}{");
  const symbols = costs.map((manaCost) => SymbolMap.get("{" + manaCost + "}"));

  return (
    <View className="flex flex-row gap-1">
      {symbols.map((symbol, index) => (
        <Image
          className="h-5 w-5"
          key={(symbol || "") + index}
          source={{ uri: symbol }}
        />
      ))}
    </View>
  );
}
