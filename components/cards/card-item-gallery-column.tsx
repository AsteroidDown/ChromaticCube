import Divider from "@/components/ui/divider/divider";
import { getCountOfCards } from "@/functions/card-stats";
import { Card } from "@/models/card/card";
import React from "react";
import { Text, View } from "react-native";
import CardItem from "./card-item";

export interface CardItemGalleryColumnProps {
  title: string;
  cards: Card[];
  condensed?: boolean;
  hideImages?: boolean;
}

export default function CardItemGalleryColumn({
  title,
  cards,
  condensed = false,
  hideImages = false,
}: CardItemGalleryColumnProps) {
  const cardCount = getCountOfCards(cards);

  const columnClasses =
    "flex gap-2 py-2 my-2 w-[256px] max-w-[256px] rounded-xl bg-background-300 bg-opacity-30";

  return (
    <View className={`${columnClasses}`}>
      <View className="flex justify-center items-center mx-2">
        <Text className="text-white font-bold text-lg">{title}</Text>

        <Text className="text-white font-semibold text-sm">
          {cardCount} Card{cardCount !== 1 ? "s" : ""}
        </Text>
      </View>

      <Divider thick />

      <View className={`flex ${condensed ? "gap-1 mx-0" : "gap-2 mx-2"}`}>
        {cards.map((card, index) => (
          <CardItem
            card={card}
            condensed={condensed}
            hideImage={hideImages}
            key={card.id + index}
          />
        ))}
      </View>
    </View>
  );
}
