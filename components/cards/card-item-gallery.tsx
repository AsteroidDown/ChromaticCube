import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { MTGColor } from "../../constants/mtg/mtg-colors";
import { MTGRarity } from "../../constants/mtg/mtg-rarity";
import { MTGCardTypes } from "../../constants/mtg/mtg-types";
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

  const [sortedCards, setSortedCards] = React.useState(sortCardsByCost(cards));
  const [cardsValue, setCardsValue] = React.useState(
    getTotalValueOfCards(cards)
  );
  const [cardCount, setCardCount] = React.useState(getCountOfCards(cards));

  const [filterByWhite, setFilterByWhite] = React.useState(false);
  const [filterByBlue, setFilterByBlue] = React.useState(false);
  const [filterByBlack, setFilterByBlack] = React.useState(false);
  const [filterByRed, setFilterByRed] = React.useState(false);
  const [filterByGreen, setFilterByGreen] = React.useState(false);

  const [filterByCreature, setFilterByCreature] = React.useState(false);
  const [filterByInstant, setFilterByInstant] = React.useState(false);
  const [filterBySorcery, setFilterBySorcery] = React.useState(false);
  const [filterByArtifact, setFilterByArtifact] = React.useState(false);
  const [filterByEnchantment, setFilterByEnchantment] = React.useState(false);
  const [filterByPlaneswalker, setFilterByPlaneswalker] = React.useState(false);
  const [filterByBattle, setFilterByBattle] = React.useState(false);
  const [filterByLand, setFilterByLand] = React.useState(false);

  const [filterByCommon, setFilterByCommon] = React.useState(false);
  const [filterByUncommon, setFilterByUncommon] = React.useState(false);
  const [filterByRare, setFilterByRare] = React.useState(false);
  const [filterByMythic, setFilterByMythic] = React.useState(false);

  const colorFilters: FilterProps = {
    title: "Color",
    options: [
      {
        title: "White",
        action: "warning",
        applied: filterByWhite,
        applyFilter: setFilterByWhite,
      },
      {
        title: "Blue",
        action: "info",
        applied: filterByBlue,
        applyFilter: setFilterByBlue,
      },
      {
        title: "Black",
        action: "primary",
        applied: filterByBlack,
        applyFilter: setFilterByBlack,
      },
      {
        title: "Red",
        action: "danger",
        applied: filterByRed,
        applyFilter: setFilterByRed,
      },
      {
        title: "Green",
        action: "success",
        applied: filterByGreen,
        applyFilter: setFilterByGreen,
      },
    ],
  };

  const typeFilters: FilterProps = {
    title: "Type",
    options: [
      {
        title: "Creature",
        applied: filterByCreature,
        applyFilter: setFilterByCreature,
      },
      {
        title: "Instant",
        applied: filterByInstant,
        applyFilter: setFilterByInstant,
      },
      {
        title: "Sorcery",
        applied: filterBySorcery,
        applyFilter: setFilterBySorcery,
      },
      {
        title: "Artifact",
        applied: filterByArtifact,
        applyFilter: setFilterByArtifact,
      },
      {
        title: "Enchantment",
        applied: filterByEnchantment,
        applyFilter: setFilterByEnchantment,
      },
      {
        title: "Planeswalker",
        applied: filterByPlaneswalker,
        applyFilter: setFilterByPlaneswalker,
      },
      {
        title: "Battle",
        applied: filterByBattle,
        applyFilter: setFilterByBattle,
      },
      {
        title: "Land",
        applied: filterByLand,
        applyFilter: setFilterByLand,
      },
    ],
  };

  const rarityFilters: FilterProps = {
    title: "Rarity",
    options: [
      {
        title: "Common",
        applied: filterByCommon,
        applyFilter: setFilterByCommon,
      },
      {
        title: "Uncommon",
        applied: filterByUncommon,
        applyFilter: setFilterByUncommon,
      },
      {
        title: "Rare",
        applied: filterByRare,
        applyFilter: setFilterByRare,
      },
      {
        title: "Mythic",
        applied: filterByMythic,
        applyFilter: setFilterByMythic,
      },
    ],
  };

  useEffect(() => {
    setSortedCards(sortCardsByCost(cards));
    setCardCount(getCountOfCards(cards));
    setCardsValue(getTotalValueOfCards(cards));
  }, [cards]);

  useEffect(() => {
    const colorFilter = [
      ...(filterByWhite ? ["white"] : []),
      ...(filterByBlue ? ["blue"] : []),
      ...(filterByBlack ? ["black"] : []),
      ...(filterByRed ? ["red"] : []),
      ...(filterByGreen ? ["green"] : []),
    ] as MTGColor[];

    const typeFilter = [
      ...(filterByCreature ? [MTGCardTypes.CREATURE] : []),
      ...(filterByInstant ? [MTGCardTypes.INSTANT] : []),
      ...(filterBySorcery ? [MTGCardTypes.SORCERY] : []),
      ...(filterByArtifact ? [MTGCardTypes.ARTIFACT] : []),
      ...(filterByEnchantment ? [MTGCardTypes.ENCHANTMENT] : []),
      ...(filterByLand ? [MTGCardTypes.LAND] : []),
      ...(filterByPlaneswalker ? [MTGCardTypes.PLANESWALKER] : []),
      ...(filterByBattle ? [MTGCardTypes.BATTLE] : []),
    ];

    const rarityFilter = [
      ...(filterByCommon ? ["common"] : []),
      ...(filterByUncommon ? ["uncommon"] : []),
      ...(filterByRare ? ["rare"] : []),
      ...(filterByMythic ? ["mythic"] : []),
    ] as MTGRarity[];

    setSortedCards(
      sortCardsByCost(cards, {
        color: colorFilter,
        type: typeFilter,
        rarity: rarityFilter,
      })
    );
    setCardCount(
      getCountOfCards(cards, {
        color: colorFilter,
        type: typeFilter,
        rarity: rarityFilter,
      })
    );
    setCardsValue(
      getTotalValueOfCards(cards, {
        color: colorFilter,
        type: typeFilter,
        rarity: rarityFilter,
      })
    );
  }, [
    filterByWhite,
    filterByBlue,
    filterByBlack,
    filterByRed,
    filterByGreen,
    filterByCreature,
    filterByInstant,
    filterBySorcery,
    filterByArtifact,
    filterByEnchantment,
    filterByPlaneswalker,
    filterByBattle,
    filterByLand,
    filterByCommon,
    filterByUncommon,
    filterByRare,
    filterByMythic,
  ]);

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

      <FilterBar filters={[colorFilters, typeFilters, rarityFilters]} />

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
