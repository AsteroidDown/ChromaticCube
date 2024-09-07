import React from "react";
import { Pressable, Text, View } from "react-native";
import { Card } from "../../models/card";
import Divider from "../ui/divider/divider";
import CardCost from "./card-cost";
import CardImage from "./card-image";

export interface CardCondensedProps {
  card: Card;
}

export default function CardCondensed({ card }: CardCondensedProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      className={
        "flex gap-2 rounded-2xl bg-background-300 overflow-hidden transition-all duration-300 " +
        (expanded ? "max-h-[1000px] " : "max-h-[36px] ")
      }
    >
      <View
        className={
          "flex flex-row gap-2 justify-between items-center px-4 py-2 max-h-[36px] h-[36px] transition-all " +
          (hovered ? "bg-primary-300" : "bg-background-300")
        }
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* <Tooltip style={[{ flex: 1 }]} message={card.name}> */}
        <Text className="text-white truncate">{card.name}</Text>
        {/* </Tooltip> */}

        {card.faces ? (
          <Text className="flex flex-row items-center gap-1">
            {card.faces.front.manaCost && (
              <CardCost size="sm" cost={card.faces.front.manaCost} />
            )}

            {card.faces.back.manaCost && (
              <Text className="text-white"> // </Text>
            )}

            {card.faces.back.manaCost && (
              <CardCost size="sm" cost={card.faces.back.manaCost} />
            )}
          </Text>
        ) : (
          card.manaCost && <CardCost size="sm" cost={card.manaCost} />
        )}
      </View>

      <Divider thick classes="-mt-2" />

      <View className="px-2 mb-2">
        <CardImage card={card} />
      </View>
    </Pressable>
  );
}
