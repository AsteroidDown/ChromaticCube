import { MTGColor, MTGColors } from "@/constants/mtg/mtg-colors";
import { MTGRarity } from "@/constants/mtg/mtg-rarity";
import { Card } from "@/models/card/card";
import { CardsSortedByColor } from "@/models/sorted-cards/sorted-cards";
import React from "react";
import { Pressable } from "react-native";
import CardViewMultipleModal from "../cards/card-view-multiple-modal";
import Text from "../ui/text/text";

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

  const borderClasses =
    (!hideRightBorder ? (double ? "border-r-2" : "border-r") : "") +
    " border-t border-background-300";
  const baseClasses =
    "flex-1 flex justify-center items-center py-1 hover:bg-opacity-80 cursor-pointer outline-none focus:bg-opacity-80 transition-all duration-150";

  const cards: Card[] =
    Object.values(sortedCards)[
      Object.keys(sortedCards).findIndex((key) => key === color) || 0
    ];

  return (
    <>
      <Pressable
        className={`${borderClasses} ${baseClasses} ${getCellBackgroundColor(
          color
        )}`}
        onPress={() => setCardPreviewModalOpen(true)}
      >
        <Text>
          {cards?.reduce((acc: number, card: Card) => acc + card.count, 0)}
        </Text>
      </Pressable>

      <CardViewMultipleModal
        open={cardPreviewModalOpen}
        setOpen={setCardPreviewModalOpen}
        cards={cards}
        color={color}
        cost={cost}
        rarity={rarity}
        type={type}
      />
    </>
  );
}

export function getCellBackgroundColor(color: MTGColor) {
  switch (color) {
    case MTGColors.WHITE:
      return "bg-mtg-white bg-opacity-10";
    case MTGColors.BLUE:
      return "bg-mtg-blue bg-opacity-10";
    case MTGColors.BLACK:
      return "bg-mtg-black bg-opacity-10";
    case MTGColors.RED:
      return "bg-mtg-red bg-opacity-10";
    case MTGColors.GREEN:
      return "bg-mtg-green bg-opacity-10";
    case MTGColors.GOLD:
      return "bg-mtg-gold bg-opacity-10";
    case MTGColors.COLORLESS:
      return "bg-mtg-colorless bg-opacity-10";
    case MTGColors.LAND:
      return "bg-mtg-land bg-opacity-10";
  }
}
