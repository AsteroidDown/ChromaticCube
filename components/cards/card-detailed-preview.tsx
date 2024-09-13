import React from "react";
import { View, ViewProps } from "react-native";
import { Card } from "../../models/card/card";
import Box from "../ui/box/box";
import Divider from "../ui/divider/divider";
import CardImage from "./card-image";
import { CardBackInfo, CardFrontInfo, CardInfo } from "./card-info";

export type CardDetailedPreview = ViewProps & {
  card?: Card;
};

export default function CardDetailedPreview({
  card,
  children,
}: CardDetailedPreview) {
  return (
    <Box className="flex flex-row flex-wrap flex-1 max-w-max justify-center gap-3 h-fit">
      <View className="flex gap-3  min-w-[250px]">
        <CardImage
          card={card}
          placeHolder="Search for a Card and it will be previewed here"
        />

        {children}
      </View>

      <Box className="flex gap-3 w-[350px]" shade={300}>
        {!card?.faces && <CardInfo card={card} />}

        {card?.faces && (
          <View className="flex gap-3">
            <CardFrontInfo card={card} />

            <Divider />

            <CardBackInfo card={card} />
          </View>
        )}
      </Box>
    </Box>
  );
}
