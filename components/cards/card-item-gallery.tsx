import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Text, View } from "react-native";
import { sortCardsByCost } from "../../functions/card-sorting";
import {
  getCountOfCards,
  getTotalValueOfCards,
} from "../../functions/card-stats";
import { Card } from "../../models/card/card";
import Box from "../ui/box/box";
import BoxHeader from "../ui/box/box-header";
import Button from "../ui/button/button";
import Divider from "../ui/divider/divider";
import { FilterProps } from "../ui/filters/filter";
import FilterBar from "../ui/filters/filter-bar";
import CardItem from "./card-item";

export interface CardItemGalleryProps {
  cards: Card[];
}

export default function CardItemGallery({ cards }: CardItemGalleryProps) {
  const [hideImages, setHideImages] = React.useState(false);

  const sortedCards = sortCardsByCost(cards);
  const cardsValue = getTotalValueOfCards(cards);
  const cardCount = getCountOfCards(cards);

  const [filterByWhite, setFilterByWhite] = React.useState(false);
  const [filterByBlue, setFilterByBlue] = React.useState(false);
  const [filterByBlack, setFilterByBlack] = React.useState(false);
  const [filterByRed, setFilterByRed] = React.useState(false);
  const [filterByGreen, setFilterByGreen] = React.useState(false);

  const filters: FilterProps[] = [
    {
      text: "White",
      action: "warning",
      applied: filterByWhite,
      applyFilter: setFilterByWhite,
    },
    {
      text: "Blue",
      action: "info",
      applied: filterByBlue,
      applyFilter: setFilterByBlue,
    },
    {
      text: "Black",
      action: "primary",
      applied: filterByBlack,
      applyFilter: setFilterByBlack,
    },
    {
      text: "Red",
      action: "danger",
      applied: filterByRed,
      applyFilter: setFilterByRed,
    },
    {
      text: "Green",
      action: "success",
      applied: filterByGreen,
      applyFilter: setFilterByGreen,
    },
  ];

  return (
    <Box className="flex gap-2 px-0 overflow-hidden">
      <BoxHeader
        title="Cards Sorted by Cost"
        subtitle={`${cardCount} Card${
          cardCount !== 1 ? "s" : ""
        } | Total Value: $${cardsValue.toFixed(2)}`}
        startIcon={faChartSimple}
        end={
          <Button
            type={hideImages ? "outlined" : "clear"}
            text={hideImages ? "Show Card Images" : "Hide Card Images"}
            onClick={() => setHideImages(!hideImages)}
          />
        }
      />

      <FilterBar filters={filters} />

      <View className="overflow-x-scroll overflow-y-hidden">
        <View className="flex flex-row gap-4 w-full min-h-[500px]">
          {sortedCards.zero?.length > 0 && (
            <CardCondensedGalleryColumn
              title="0 Cost"
              hideImages={hideImages}
              cards={sortedCards.zero}
            />
          )}
          <CardCondensedGalleryColumn
            title="1 Cost"
            hideImages={hideImages}
            cards={sortedCards.one}
          />
          <CardCondensedGalleryColumn
            title="2 Cost"
            hideImages={hideImages}
            cards={sortedCards.two}
          />
          <CardCondensedGalleryColumn
            title="3 Cost"
            hideImages={hideImages}
            cards={sortedCards.three}
          />
          <CardCondensedGalleryColumn
            title="4 Cost"
            hideImages={hideImages}
            cards={sortedCards.four}
          />
          <CardCondensedGalleryColumn
            title="5 Cost"
            hideImages={hideImages}
            cards={sortedCards.five}
          />
          <CardCondensedGalleryColumn
            title="6 Cost"
            hideImages={hideImages}
            cards={sortedCards.six}
          />
          <CardCondensedGalleryColumn
            title="7+ Cost"
            hideImages={hideImages}
            cards={sortedCards.seven}
          />
          {sortedCards.land?.length > 0 && (
            <CardCondensedGalleryColumn
              title="Lands"
              hideImages={hideImages}
              cards={sortedCards.land}
            />
          )}
        </View>
      </View>
    </Box>
  );
}

export interface CardCondensedGalleryColumnProps {
  title: string;
  cards: Card[];
  hideImages?: boolean;
}

export function CardCondensedGalleryColumn({
  title,
  cards,
  hideImages = false,
}: CardCondensedGalleryColumnProps) {
  const cardCount = getCountOfCards(cards);

  const columnClasses =
    "my-2 bg-background-300 bg-opacity-30 py-2 rounded-xl flex gap-2 w-[256px] max-w-[256px]";

  return (
    <View className={columnClasses}>
      <View className="flex justify-center items-center mx-2">
        <Text className="text-white font-bold text-lg">{title}</Text>

        <Text className="text-white font-semibold text-sm">
          {cardCount} Card{cardCount !== 1 ? "s" : ""}
        </Text>
      </View>

      <Divider thick />

      <View className="flex gap-2 mx-2">
        {cards.map((card, index) => (
          <CardItem card={card} hideImage={hideImages} key={card.id + index} />
        ))}
      </View>
    </View>
  );
}
