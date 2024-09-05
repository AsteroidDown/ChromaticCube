import { Card } from "../models/card";
import { ScryfallCard } from "../models/scryfall-card";

export function ScryfallToCard(scryfallCard: ScryfallCard): Card {
  return {
    name: scryfallCard.name,
    cmc: scryfallCard.cmc,
    rarity: scryfallCard.rarity,
    colorIdentity: scryfallCard.color_identity,
    manaCost: scryfallCard.mana_cost,
    images: {
      small: scryfallCard.image_uris.small,
      normal: scryfallCard.image_uris.normal,
      large: scryfallCard.image_uris.large,
      png: scryfallCard.image_uris.png,
      artCrop: scryfallCard.image_uris.art_crop,
      borderCrop: scryfallCard.image_uris.border_crop,
    },
  };
}
