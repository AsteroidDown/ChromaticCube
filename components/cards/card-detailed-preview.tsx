import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Text, View } from "react-native";
import { Card } from "../../models/card";
import Box from "../ui/box/box";
import Button from "../ui/button/button";
import Divider from "../ui/divider/divider";
import CardImage from "./card-image";
import { CardBackInfo, CardFrontInfo, CardInfo } from "./card-info";

export interface CardDetailedPreview {
  card?: Card;

  action?: () => void;
}

export default function CardDetailedPreview({
  card,
  action,
}: CardDetailedPreview) {
  return (
    <Box classes="flex flex-row flex-wrap justify-center gap-3 h-full">
      <View className="flex gap-3 h-full min-w-[250px]">
        <CardImage
          card={card}
          placeHolder="Search for a Card and it will be previewed here"
        />

        <Button
          text="Add Card"
          icon={faPlus}
          onClick={action}
          disabled={!card}
        />
      </View>

      <Box classes="flex gap-3 w-[350px]" shade={300}>
        {!card?.faces && <CardInfo card={card} />}

        {card?.faces && (
          <View className="flex gap-3">
            <Text className="text-white text-lg font-semibold">Front Face</Text>
            <Divider />
            <CardFrontInfo card={card} />

            <Text className="text-white text-lg font-semibold mt-3">
              Back Face
            </Text>
            <Divider />
            <CardBackInfo card={card} />
          </View>
        )}
      </Box>
    </Box>
  );
}
