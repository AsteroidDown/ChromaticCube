import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import StoredCardsContext from "../../contexts/cards/stored-cards.context";
import { filterCards } from "../../functions/card-filtering";
import {
  sortCardsAlphabetically,
  sortCardsByColor,
  sortCardsByCost,
  sortCardsByPrice,
  sortCardsByType,
} from "../../functions/card-sorting";
import {
  getCountOfCards,
  getTotalValueOfCards,
} from "../../functions/card-stats";
import { getLocalStorageStoredCards } from "../../functions/local-storage";
import { Card } from "../../models/card/card";
import {
  CardFilters,
  CardsSortedByColor,
  CardsSortedByCost,
  CardsSortedByType,
} from "../../models/sorted-cards/sorted-cards";
import Box from "../ui/box/box";
import BoxHeader from "../ui/box/box-header";
import Button from "../ui/button/button";
import FilterBar from "../ui/filters/filter-bar";
import CardItemGalleryColumn from "./card-item-gallery-column";

export type CardItemGalleryType = "cost" | "color" | "type";

export interface CardItemGalleryProps {
  type: CardItemGalleryType;
}

export default function CardItemGallery({
  type = "cost",
}: CardItemGalleryProps) {
  const { storedCards } = useContext(StoredCardsContext);

  const [cards, setCards] = React.useState([] as Card[]);

  const [cardCount, setCardCount] = React.useState(0);
  const [cardsValue, setCardsValue] = React.useState(0);

  const [hideImages, setHideImages] = React.useState(false);
  const [filters, setFilters] = React.useState({} as CardFilters);

  const [cardsSortedByCost, setCardsSortedByCost] = React.useState(
    {} as CardsSortedByCost
  );
  const [cardsSortedByColor, setCardsSortedByColor] = React.useState(
    {} as CardsSortedByColor
  );
  const [cardsSortedByType, setCardsSortedByType] = React.useState(
    {} as CardsSortedByType
  );

  useEffect(() => {
    setCards(sortCardsAlphabetically(storedCards));
  }, [storedCards]);

  useEffect(() => {
    setCards(sortCardsAlphabetically(getLocalStorageStoredCards()));
  }, []);

  useEffect(() => {
    const sortedCards =
      filters.priceSort === "ASC"
        ? sortCardsByPrice(cards)
        : filters.priceSort === "DESC"
        ? sortCardsByPrice(cards, false)
        : cards;

    const filteredCards = filterCards(sortedCards, filters);

    setCardCount(getCountOfCards(filteredCards));
    setCardsValue(getTotalValueOfCards(filteredCards));

    if (type === "cost") {
      setCardsSortedByCost(sortCardsByCost(filteredCards));
    }
    if (type === "color") {
      setCardsSortedByColor(sortCardsByColor(filteredCards));
    }
    if (type === "type") {
      setCardsSortedByType(sortCardsByType(filteredCards));
    }
  }, [cards, filters]);

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
        {type === "cost" && cardsSortedByCost.one && (
          <View className="flex flex-row gap-4 w-full min-h-[500px]">
            {cardsSortedByCost.zero?.length > 0 && (
              <CardItemGalleryColumn
                title="0 Cost"
                hideImages={hideImages}
                cards={cardsSortedByCost.zero}
              />
            )}
            <CardItemGalleryColumn
              title="1 Cost"
              hideImages={hideImages}
              cards={cardsSortedByCost.one}
            />
            <CardItemGalleryColumn
              title="2 Cost"
              hideImages={hideImages}
              cards={cardsSortedByCost.two}
            />
            <CardItemGalleryColumn
              title="3 Cost"
              hideImages={hideImages}
              cards={cardsSortedByCost.three}
            />
            <CardItemGalleryColumn
              title="4 Cost"
              hideImages={hideImages}
              cards={cardsSortedByCost.four}
            />
            <CardItemGalleryColumn
              title="5 Cost"
              hideImages={hideImages}
              cards={cardsSortedByCost.five}
            />
            <CardItemGalleryColumn
              title="6 Cost"
              hideImages={hideImages}
              cards={cardsSortedByCost.six}
            />
            <CardItemGalleryColumn
              title="7+ Cost"
              hideImages={hideImages}
              cards={cardsSortedByCost.seven}
            />
            {cardsSortedByCost.land?.length > 0 && (
              <CardItemGalleryColumn
                title="Lands"
                hideImages={hideImages}
                cards={cardsSortedByCost.land}
              />
            )}
          </View>
        )}

        {type === "color" && cardsSortedByColor.white && (
          <View className="flex flex-row gap-4 w-full min-h-[500px]">
            <CardItemGalleryColumn
              title="White"
              hideImages={hideImages}
              cards={cardsSortedByColor.white}
            />
            <CardItemGalleryColumn
              title="Blue"
              hideImages={hideImages}
              cards={cardsSortedByColor.blue}
            />
            <CardItemGalleryColumn
              title="Black"
              hideImages={hideImages}
              cards={cardsSortedByColor.black}
            />
            <CardItemGalleryColumn
              title="Red"
              hideImages={hideImages}
              cards={cardsSortedByColor.red}
            />
            <CardItemGalleryColumn
              title="Green"
              hideImages={hideImages}
              cards={cardsSortedByColor.green}
            />
            <CardItemGalleryColumn
              title="Gold"
              hideImages={hideImages}
              cards={cardsSortedByColor.gold}
            />
            <CardItemGalleryColumn
              title="Colorless"
              hideImages={hideImages}
              cards={cardsSortedByColor.colorless}
            />
            <CardItemGalleryColumn
              title="Land"
              hideImages={hideImages}
              cards={cardsSortedByColor.land}
            />
          </View>
        )}

        {type === "type" && cardsSortedByType.creature && (
          <View className="flex flex-row gap-4 w-full min-h-[500px]">
            <CardItemGalleryColumn
              title="Creature"
              hideImages={hideImages}
              cards={cardsSortedByType.creature}
            />
            <CardItemGalleryColumn
              title="Instant"
              hideImages={hideImages}
              cards={cardsSortedByType.instant}
            />
            <CardItemGalleryColumn
              title="Sorcery"
              hideImages={hideImages}
              cards={cardsSortedByType.sorcery}
            />
            <CardItemGalleryColumn
              title="Artifact"
              hideImages={hideImages}
              cards={cardsSortedByType.artifact}
            />
            <CardItemGalleryColumn
              title="Enchantment"
              hideImages={hideImages}
              cards={cardsSortedByType.enchantment}
            />
            <CardItemGalleryColumn
              title="Land"
              hideImages={hideImages}
              cards={cardsSortedByType.land}
            />
            {cardsSortedByType.planeswalker?.length > 0 && (
              <CardItemGalleryColumn
                title="Colorless"
                hideImages={hideImages}
                cards={cardsSortedByType.planeswalker}
              />
            )}
            {cardsSortedByType.battle?.length > 0 && (
              <CardItemGalleryColumn
                title="Land"
                hideImages={hideImages}
                cards={cardsSortedByType.battle}
              />
            )}
          </View>
        )}
      </View>
    </Box>
  );
}
