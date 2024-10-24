import Box from "@/components/ui/box/box";
import Divider from "@/components/ui/divider/divider";
import { Card } from "@/models/card/card";
import React from "react";
import { View, ViewProps } from "react-native";
import CardImage from "./card-image";
import { CardBackInfo, CardFrontInfo, CardInfo } from "./card-info";
import { CardLegalities } from "./card-legalities";

export type CardDetailedPreview = ViewProps & {
  card?: Card;
};

export default function CardDetailedPreview({
  card,
  children,
}: CardDetailedPreview) {
  return (
    <Box className="flex flex-row flex-wrap flex-1 max-w-max min-w-fit justify-center gap-3 h-fit">
      <View className="flex gap-3  min-w-[250px]">
        <CardImage
          card={card}
          placeHolder="Search for a card and it will be previewed here"
        />

        {children}
      </View>

      <Box
        className="flex gap-3 w-[364px] max-h-[458px] overflow-y-auto"
        shade={300}
      >
        {!card?.faces && <CardInfo card={card} />}

        {card?.faces && (
          <View className="flex gap-3">
            <CardFrontInfo card={card} />

            <Divider thick className="my-3" />

            <CardBackInfo card={card} />
          </View>
        )}

        <Divider thick />

        <CardLegalities card={card} />
      </Box>
    </Box>
  );
}
