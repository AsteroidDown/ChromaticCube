import { faShop, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { removeLocalStorageCard } from "../../functions/local-storage";
import { Card } from "../../models/card/card";
import Button from "../ui/button/button";
import Divider from "../ui/divider/divider";
import CardCost from "./card-cost";
import CardImage from "./card-image";

export interface CardItemProps {
  card: Card;
}

export default function CardItem({ card }: CardItemProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      className={
        "flex gap-2 rounded-2xl bg-background-300 overflow-hidden transition-all duration-300 " +
        (expanded ? "max-h-[1000px] " : "max-h-[36px] ")
      }
    >
      <View
        className={
          "flex flex-row gap-1 justify-between items-center px-4 py-2 max-h-[36px] h-[36px] transition-all " +
          (hovered ? "bg-primary-300" : "bg-background-300")
        }
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* <Tooltip style={[{ flex: 1 }]} message={card.name}> */}
        <Text className="text-white truncate">{card.name}</Text>
        {/* </Tooltip> */}

        {card.faces ? (
          <Text className="flex flex-row items-center gap-1">
            {card.faces.front.manaCost && (
              <CardCost size="sm" cost={card.faces.front.manaCost} />
            )}

            {card.faces.back.manaCost && (
              <Text className="text-white"> // </Text>
            )}

            {card.faces.back.manaCost && (
              <CardCost size="sm" cost={card.faces.back.manaCost} />
            )}
          </Text>
        ) : (
          card.manaCost && <CardCost size="sm" cost={card.manaCost} />
        )}
      </View>

      <Divider thick />

      <View className="flex gap-2 px-2">
        <CardImage card={card} />
      </View>

      <Divider thick />

      <View className="flex flex-row justify-end gap-2 px-2">
        <Button
          action="danger"
          icon={faTrash}
          onClick={() => removeLocalStorageCard(card)}
        ></Button>
      </View>

      <View className="flex flex-row gap-2 px-2 pb-2">
        <Button
          size="xs"
          action="info"
          className="flex-1"
          icon={faShop}
          text={`$${card.prices?.usd}`}
          onClick={async () => await Linking.openURL(card.priceUris.tcgplayer)}
        />

        <Button
          size="xs"
          action="info"
          className="flex-1"
          icon={faShop}
          text={`€${card.prices?.eur}`}
          onClick={async () => await Linking.openURL(card.priceUris.cardmarket)}
        />
      </View>
    </Pressable>
  );
}
