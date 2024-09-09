import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { View } from "react-native";
import { Card } from "../../models/card/card";
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
    <Box className="flex flex-row flex-wrap justify-center gap-3 h-fit">
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
