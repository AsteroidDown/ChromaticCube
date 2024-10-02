import CardImage from "@/components/cards/card-image";
import Box from "@/components/ui/box/box";
import Button from "@/components/ui/button/button";
import Placeholder from "@/components/ui/placeholder/placeholder";
import { MTGColor } from "@/constants/mtg/mtg-colors";
import { titleCase } from "@/functions/text-manipulation";
import { Card } from "@/models/card/card";
import { CardsSortedByColor } from "@/models/sorted-cards/sorted-cards";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import Modal from "../../ui/modal/modal";
import Text from "../../ui/text/text";
import { getCellBackgroundColor } from "../chart";

interface CostChartRowProps {
  hideRightBorder?: boolean;
  double?: boolean;
  sortedCards: CardsSortedByColor;
  color: MTGColor;
  cost?: number;
}

export default function CostChartCell({
  hideRightBorder = false,
  double = false,
  sortedCards,
  color,
  cost,
}: CostChartRowProps) {
  const [cardPreviewModalOpen, setCardPreviewModalOpen] = React.useState(false);

  const borderClasses =
    (!hideRightBorder ? (double ? "border-r-2" : "border-r") : "") +
    " border-t border-background-300";
  const baseClasses =
    "flex-1 flex justify-center items-center hover:bg-opacity-80 cursor-pointer transition-all duration-150";

  const cards: Card[] =
    Object.values(sortedCards)[
      Object.keys(sortedCards).findIndex((key) => key === color) || 0
    ];

  const title = `${titleCase(color)}${
    cost ? (cost === 7 ? " 7+ Cost" : " " + cost + " Cost") : ""
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
          {
            Object.values(sortedCards)[
              Object.keys(sortedCards).findIndex((key) => key === color) || 0
            ]?.length
          }
        </Text>
      </Pressable>

      <Modal open={cardPreviewModalOpen} setOpen={setCardPreviewModalOpen}>
        <Text size="lg" thickness="bold">
          {title + ` (${cards.length})`}
        </Text>

        <Box className="flex flex-row flex-wrap gap-2 min-h-[350px] max-h-[80vh] min-w-[228px] w-fit max-w-[938px] !px-0 overflow-x-auto">
          {cards?.map((card: Card, index: number) => (
            <CardImage card={card} key={card.id + index} />
          ))}

          {!cards?.length && (
            <Placeholder
              title="No Cards Found!"
              subtitle={`Add some ${title.toLowerCase()} cards and they'll show up here!`}
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
