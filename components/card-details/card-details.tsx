import React from "react";
import { Text, View } from "react-native";
import { Card } from "../../models/card";
import Box from "../ui/box/box";
import Divider from "../ui/divider/divider";
import CardImage from "./card-image";
import { CardBackInfo, CardFrontInfo, CardInfo } from "./card-info";

export interface CardDetailsProps {
  card?: Card;
}

export default function CardDetails({ card }: CardDetailsProps) {
  return (
    <Box classes="flex flex-row flex-wrap justify-center gap-3">
      <CardImage
        card={card}
        placeHolder="Search for a Card and it will be previewed here"
      />

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
