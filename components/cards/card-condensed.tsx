import { Text, View } from "react-native";
import { Card } from "../../models/card";
import { Tooltip } from "../ui/tooltip/tooltip";
import CardCost from "./card-cost";

export interface CardCondensedProps {
  card: Card;
}

export default function CardCondensed({ card }: CardCondensedProps) {
  return (
    <View className="flex flex-row gap-2 justify-between items-center rounded-full bg-background-300 px-4 py-2 max-h-[36px]">
      <Tooltip style={[{ flex: 1 }]} message={card.name}>
        <Text className="text-white truncate">{card.name}</Text>
      </Tooltip>

      {card.faces ? (
        <Text className="flex flex-row items-center gap-1">
          {card.faces.front.manaCost && (
            <CardCost size="sm" cost={card.faces.front.manaCost} />
          )}

          {card.faces.back.manaCost && <Text className="text-white"> // </Text>}

          {card.faces.back.manaCost && (
            <CardCost size="sm" cost={card.faces.back.manaCost} />
          )}
        </Text>
      ) : (
        card.manaCost && <CardCost size="sm" cost={card.manaCost} />
      )}
    </View>
  );
}
