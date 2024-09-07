import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Card } from "../../models/card";
import Box from "../ui/box/box";
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

        <Pressable onPress={action} disabled={!card}>
          <View
            className={
              "flex flex-row gap-2 justify-center items-center w-full h-10 rounded-md transition-all duration-300 " +
              (card ? "bg-primary-500 hover:bg-primary-400" : "bg-dark-300")
            }
          >
            <FontAwesomeIcon icon={faPlus} />

            <Text
              className={
                "text-md font-bold " +
                (card ? "text-dark-100" : "text-dark-600")
              }
            >
              Add Card
            </Text>
          </View>
        </Pressable>
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
