import {
  faRotateRight,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Card } from "../../models/card";

export interface CardImageProps {
  card?: Card;
  placeHolder?: string;
  actionIcon?: IconDefinition;

  onClick?: () => any;
  action?: () => any;
}

export default function CardImage({
  card,
  placeHolder,
  onClick,
  action,
  actionIcon,
}: CardImageProps) {
  const [showFront, setShowFront] = React.useState(true);
  const [hovered, setHovered] = React.useState(true);

  const hoverClasses = "hover:h-[355px] hover:-my-[2.5px] hover:-mx-[2px]";

  return (
    <Pressable
      disabled={!card}
      onPress={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <View
        className={
          "relative flex justify-center items-center h-[350px] aspect-[2.5/3.5] rounded-lg bg-background-100 transition-all " +
          (hovered ? hoverClasses : "")
        }
      >
        {card ? (
          <Image
            className={
              "h-[350px] aspect-[2.5/3.5] rounded transition-all " +
              (hovered ? hoverClasses : "")
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

        {card?.faces && (
          <View
            className={
              "absolute bottom-0 right-0 bg-background-100 p-4 rounded-full transition-all " +
              (hovered ? "m-[10px]" : "m-2")
            }
          >
            <Pressable
              onPress={() => setShowFront(!showFront)}
              onPointerEnter={() => setHovered(true)}
            >
              <FontAwesomeIcon
                className={
                  "text-white transition-all " +
                  (!showFront ? "rotate-[270deg]" : "")
                }
                icon={faRotateRight}
              />
            </Pressable>
          </View>
        )}

        {action && hovered && (
          <View
            className={
              "absolute bottom-2 right-[50%] translate-x-[70%] bg-red-500 border border-b-background-100 p-4 rounded-full transition-all " +
              (hovered ? "m-[9px]" : "m-2")
            }
          >
            <Pressable onPress={action} onPointerEnter={() => setHovered(true)}>
              <FontAwesomeIcon
                className="text-background-100"
                icon={actionIcon ?? faRotateRight}
              />
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}
