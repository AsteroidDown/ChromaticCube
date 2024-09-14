import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import {
  sortCardsAlphabetically,
  sortCardsByCost,
  sortCardsByPrice,
} from "../../functions/card-sorting";
import {
  getCountOfCards,
  getTotalValueOfCards,
} from "../../functions/card-stats";
import { getLocalStorageStoredCards } from "../../functions/local-storage";
import { Card } from "../../models/card/card";
import { CardFilters } from "../../models/sorted-cards/sorted-cards";
import Box from "../ui/box/box";
import BoxHeader from "../ui/box/box-header";
import Button from "../ui/button/button";
import Divider from "../ui/divider/divider";
import FilterBar from "../ui/filters/filter-bar";
import CardItem from "./card-item";

export default function CardItemGallery() {
  const [cards, setCards] = React.useState([] as Card[]);

  const [hideImages, setHideImages] = React.useState(false);

  const [cardsSortedByCost, setCardsSortedByCost] = React.useState(
    sortCardsByCost(sortCardsAlphabetically(cards))
  );
  const [cardsValue, setCardsValue] = React.useState(
    getTotalValueOfCards(cards)
  );
  const [cardCount, setCardCount] = React.useState(getCountOfCards(cards));

  const [filters, setFilters] = React.useState({} as CardFilters);

  useEffect(() => setCards(getLocalStorageStoredCards()), []);

  useEffect(() => {
    setCardsSortedByCost(sortCardsByCost(cards));
    setCardCount(getCountOfCards(cards));
    setCardsValue(getTotalValueOfCards(cards));
  }, [cards]);

  useEffect(() => {
    const sortedCards =
      filters.priceSort === "ASC"
        ? sortCardsByPrice(cards)
        : filters.priceSort === "DESC"
        ? sortCardsByPrice(cards, false)
        : cards;

    setCardsSortedByCost(sortCardsByCost(sortedCards, filters));
    setCardCount(getCountOfCards(sortedCards, filters));
    setCardsValue(getTotalValueOfCards(sortedCards, filters));
  }, [filters]);

  return (
    <Box className="!rounded-tl-none flex gap-2 px-0 overflow-hidden">
      <BoxHeader
        title="Cards Sorted by Cost"
        startIcon={faChartSimple}
        subtitle={`${cardCount} Card${
          cardCount !== 1 ? "s" : ""
        } | Total Value: $${cardsValue.toFixed(2)}`}
        end={
          <View className="flex flex-row gap-4">
            <FilterBar setFilters={setFilters} />

            <Button
              type={hideImages ? "outlined" : "clear"}
              text={hideImages ? "Show Card Images" : "Hide Card Images"}
              onClick={() => setHideImages(!hideImages)}
            />
          </View>
        }
      />

      <View className="overflow-x-scroll overflow-y-hidden">
        <View className="flex flex-row gap-4 w-full min-h-[500px]">
          {cardsSortedByCost.zero?.length > 0 && (
            <CardCondensedGalleryColumn
              title="0 Cost"
              hideImages={hideImages}
              cards={cardsSortedByCost.zero}
            />
          )}
          <CardCondensedGalleryColumn
            title="1 Cost"
            hideImages={hideImages}
            cards={cardsSortedByCost.one}
          />
          <CardCondensedGalleryColumn
            title="2 Cost"
            hideImages={hideImages}
            cards={cardsSortedByCost.two}
          />
          <CardCondensedGalleryColumn
            title="3 Cost"
            hideImages={hideImages}
            cards={cardsSortedByCost.three}
          />
          <CardCondensedGalleryColumn
            title="4 Cost"
            hideImages={hideImages}
            cards={cardsSortedByCost.four}
          />
          <CardCondensedGalleryColumn
            title="5 Cost"
            hideImages={hideImages}
            cards={cardsSortedByCost.five}
          />
          <CardCondensedGalleryColumn
            title="6 Cost"
            hideImages={hideImages}
            cards={cardsSortedByCost.six}
          />
          <CardCondensedGalleryColumn
            title="7+ Cost"
            hideImages={hideImages}
            cards={cardsSortedByCost.seven}
          />
          {cardsSortedByCost.land?.length > 0 && (
            <CardCondensedGalleryColumn
              title="Lands"
              hideImages={hideImages}
              cards={cardsSortedByCost.land}
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
