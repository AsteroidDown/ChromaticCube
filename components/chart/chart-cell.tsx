import CardImage from "@/components/cards/card-image";
import Box from "@/components/ui/box/box";
import Button from "@/components/ui/button/button";
import Placeholder from "@/components/ui/placeholder/placeholder";
import { MTGColor } from "@/constants/mtg/mtg-colors";
import { MTGRarity } from "@/constants/mtg/mtg-rarity";
import { titleCase } from "@/functions/text-manipulation";
import { Card } from "@/models/card/card";
import { CardsSortedByColor } from "@/models/sorted-cards/sorted-cards";
import { faPlus, faShop } from "@fortawesome/free-solid-svg-icons";
import { Link } from "expo-router";
import React from "react";
import { Linking, Pressable, View } from "react-native";
import Modal from "../ui/modal/modal";
import Text from "../ui/text/text";
import { ChartType } from "./chart";

interface ChartCellProps {
  sortedCards: CardsSortedByColor;
  color: MTGColor;
  cost?: number;
  rarity?: MTGRarity;
  type?: string;
  double?: boolean;
  hideRightBorder?: boolean;
}

export default function ChartCell({
  sortedCards,
  color,
  cost,
  rarity,
  type,
  double = false,
  hideRightBorder = false,
}: ChartCellProps) {
  const [cardPreviewModalOpen, setCardPreviewModalOpen] = React.useState(false);

  const cellType: ChartType = cost ? "cost" : rarity ? "rarity" : "type";

  const borderClasses =
    (!hideRightBorder ? (double ? "border-r-2" : "border-r") : "") +
    " border-t border-background-300";
  const baseClasses =
    "flex-1 flex justify-center items-center py-1 hover:bg-opacity-80 cursor-pointer outline-none focus:bg-opacity-80 transition-all duration-150";

  const cards: Card[] =
    Object.values(sortedCards)[
      Object.keys(sortedCards).findIndex((key) => key === color) || 0
    ];

  const title = `${titleCase(color)} ${
    cellType === "cost"
      ? cost
        ? cost === 7
          ? "7+ Cost"
          : cost + " Cost"
        : ""
      : cellType === "rarity"
      ? rarity
        ? titleCase(rarity)
        : ""
      : titleCase(type)
  } Cards`;

  return (
    <>
      <Pressable
        className={`${borderClasses} ${baseClasses} ${getCellBackgroundColor(
          color
        )}`}
        onPress={() => setCardPreviewModalOpen(true)}
      >
        <Text>
          {Object.values(sortedCards)[
            Object.keys(sortedCards).findIndex((key) => key === color) || 0
          ]?.reduce((acc: number, card: Card) => acc + card.count, 0)}
        </Text>
      </Pressable>

      <Modal open={cardPreviewModalOpen} setOpen={setCardPreviewModalOpen}>
        <Text size="lg" thickness="bold">
          {title + ` (${cards.length})`}
        </Text>

        <Box className="flex flex-row flex-wrap gap-2 min-h-[350px] max-h-[80vh] w-fit min-w-[228px] max-w-[1000px] !px-0 overflow-x-auto">
          {cards?.map((card: Card, index: number) => (
            <Box
              key={card.id + index}
              className="flex gap-1 !bg-background-100 !p-2 max-w-[244px]"
            >
              <View className="flex flex-row gap-2 px-2">
                <Text thickness="bold">{card.count}</Text>
                <Text truncate thickness="bold">
                  {card.name}
                </Text>
              </View>

              <CardImage card={card} />

              <View className="flex flex-row gap-2 px-2 pb-1">
                <Button
                  size="xs"
                  action="info"
                  className="flex-1"
                  icon={faShop}
                  text={`$${card.prices?.usd}`}
                  onClick={async () =>
                    await Linking.openURL(card.priceUris.tcgplayer)
                  }
                />

                <Button
                  size="xs"
                  action="info"
                  className="flex-1"
                  icon={faShop}
                  text={`€${card.prices?.eur}`}
                  onClick={async () =>
                    await Linking.openURL(card.priceUris.cardmarket)
                  }
                />
              </View>
            </Box>
          ))}

          {!cards?.length && (
            <Placeholder
              title="No Cards Found!"
              subtitle={`Add some ${title.toLowerCase()} and they'll show up here!`}
            >
              <Link href="./(tabs)/main-board">
                <Button icon={faPlus} text="Add Cards"></Button>
              </Link>
            </Placeholder>
          )}
        </Box>
      </Modal>
    </>
  );
}

export function getCellBackgroundColor(color: MTGColor) {
  switch (color) {
    case "white":
      return "bg-mtg-white bg-opacity-10";
    case "blue":
      return "bg-mtg-blue bg-opacity-10";
    case "black":
      return "bg-mtg-black bg-opacity-10";
    case "red":
      return "bg-mtg-red bg-opacity-10";
    case "green":
      return "bg-mtg-green bg-opacity-10";
    case "gold":
      return "bg-mtg-gold bg-opacity-10";
    case "colorless":
      return "bg-mtg-colorless bg-opacity-10";
    case "land":
      return "bg-mtg-land bg-opacity-10";
  }
}
