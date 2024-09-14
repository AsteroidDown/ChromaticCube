import { MTGColorMap } from "../constants/mtg/mtg-colors";
import { Card } from "../models/card/card";
import { CardFilters } from "../models/sorted-cards/sorted-cards";

export function getTotalValueOfCards(
  cards: Card[],
  filters?: CardFilters,
  euro: boolean = false
) {
  const filteredColors = filters?.colorFilter?.map((color) =>
    MTGColorMap.get(color)
  );
  const filteredTypes = filters?.typeFilter;
  const filteredRarity = filters?.rarityFilter;

  return (
    Math.round(
      cards.reduce((acc, card) => {
        if (
          (filteredColors?.length &&
            !filteredColors.some((color) =>
              card.colorIdentity.includes(color!)
            )) ||
          (filteredTypes?.length &&
            !filteredTypes.some((type) =>
              card.faces?.front
                ? card.faces.front.typeLine.includes(type)
                : card.typeLine.includes(type)
            )) ||
          (filteredRarity?.length &&
            !filteredRarity.some((rarity) => card.rarity === rarity))
        ) {
          return acc;
        }

        return (
          acc +
          card.count * (euro ? card.prices.eur || 0 : card.prices.usd || 0)
        );
      }, 0) * 100
    ) / 100
  );
}

export function getCountOfCards(cards: Card[], filters?: CardFilters) {
  const filteredColors = filters?.colorFilter?.map((color) =>
    MTGColorMap.get(color)
  );
  const filteredTypes = filters?.typeFilter;
  const filteredRarity = filters?.rarityFilter;

  return cards.reduce((acc, card) => {
    if (
      (filteredColors?.length &&
        !filteredColors.some((color) => card.colorIdentity.includes(color!))) ||
      (filteredTypes?.length &&
        !filteredTypes.some((type) =>
          card.faces?.front
            ? card.faces.front.typeLine.includes(type)
            : card.typeLine.includes(type)
        )) ||
      (filteredRarity?.length &&
        !filteredRarity.some((rarity) => card.rarity === rarity))
    ) {
      return acc;
    }

    return acc + card.count;
  }, 0);
}
