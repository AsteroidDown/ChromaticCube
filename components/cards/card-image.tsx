import { CardBackIds } from "@/constants/scryfall/ids";
import { Card } from "@/models/card/card";
import {
  faRotateRight,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export interface CardImageProps {
  card?: Card;
  placeHolder?: string;
  actionIcon?: IconDefinition;

  onClick?: () => any;
}

export default function CardImage({
  card,
  placeHolder,
  onClick,
}: CardImageProps) {
  const [showFront, setShowFront] = React.useState(true);
  const [hovered, setHovered] = React.useState(false);

  return (
    <Pressable
      disabled={!card || !onClick}
      onPress={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <View
        className={
          "relative flex justify-center items-center h-full max-h-[350px] aspect-[2.5/3.5] rounded-lg bg-background-100 transition-all "
          //  + (hovered ? hoverClasses : "")
        }
      >
        {card ? (
          <Image
            className={
              "h-full max-h-[350px] aspect-[2.5/3.5] rounded transition-all "
              //  + (hovered ? hoverClasses : "")
            }
            source={{
              uri:
                card.images?.png ||
                (showFront
                  ? card.faces?.front.imageUris.png
                  : card.faces?.back.imageUris.png),
            }}
            style={[{ resizeMode: "contain" }]}
          />
        ) : (
          <>
            {placeHolder && (
              <Text className="text-white text-center">{placeHolder}</Text>
            )}
          </>
        )}

        {card?.faces && card.cardBackId !== CardBackIds.DEFAULT && (
          <Pressable
            className="absolute m-2 bottom-0 right-0"
            onPress={() => setShowFront(!showFront)}
          >
            <View
              className={
                "bg-background-100 p-4 rounded-full transition-all " +
                (hovered ? "bg-opacity-100" : "bg-opacity-85")
              }
            >
              <FontAwesomeIcon
                className={
                  "text-white transition-all " +
                  (!showFront ? "rotate-[270deg]" : "")
                }
                icon={faRotateRight}
              />
            </View>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
