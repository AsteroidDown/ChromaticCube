import React from "react";
import { Text, View } from "react-native";
import { getCountOfCards } from "../../functions/card-stats";
import { Card } from "../../models/card/card";
import Divider from "../ui/divider/divider";
import CardItem from "./card-item";

export interface CardItemGalleryColumnProps {
  title: string;
  cards: Card[];
  hideImages?: boolean;
}

export default function CardItemGalleryColumn({
  title,
  cards,
  hideImages = false,
}: CardItemGalleryColumnProps) {
  const cardCount = getCountOfCards(cards);

  const columnClasses =
    "my-2 bg-background-300 bg-opacity-30 py-2 rounded-xl flex gap-2 w-[256px] max-w-[256px]";

  return (
    <View className={columnClasses}>
      <View className="flex justify-center items-center mx-2">
        <Text className="text-white font-bold text-lg">{title}</Text>

        <Text className="text-white font-semibold text-sm">
          {cardCount} Card{cardCount !== 1 ? "s" : ""}
        </Text>
      </View>

      <Divider thick />

      <View className="flex gap-2 mx-2">
        {cards.map((card, index) => (
          <CardItem card={card} hideImage={hideImages} key={card.id + index} />
        ))}
      </View>
    </View>
  );
}
