import { Card, ImageUris } from "../models/card";
import { ScryfallCard, ScryfallImageUris } from "../models/scryfall-card";

export function ScryfallToCard(scryfallCard: ScryfallCard): Card {
  function transferImageUris(imageUris: ScryfallImageUris): ImageUris {
    return {
      small: imageUris?.small || "",
      normal: imageUris?.normal || "",
      large: imageUris?.large || "",
      png: imageUris?.png,
      artCrop: imageUris?.art_crop || "",
      borderCrop: imageUris?.border_crop || "",
    };
  }

  return {
    name: scryfallCard.name,
    cmc: scryfallCard.cmc,
    rarity: scryfallCard.rarity,
    colorIdentity: scryfallCard.color_identity,
    manaCost: scryfallCard.mana_cost,
    typeLine: scryfallCard.type_line,
    producedMana: scryfallCard.produced_mana,
    oracleText: scryfallCard.oracle_text,
    images: transferImageUris(scryfallCard.image_uris),
    faces: scryfallCard.card_faces
      ? {
          front: {
            name: scryfallCard.card_faces[0].name,
            manaCost: scryfallCard.card_faces[0].mana_cost,
            typeLine: scryfallCard.card_faces[0].type_line,
            oracleText: scryfallCard.card_faces[0].oracle_text,
            imageUris: transferImageUris(scryfallCard.card_faces[0].image_uris),
          },
          back: {
            name: scryfallCard.card_faces[1].name,
            manaCost: scryfallCard.card_faces[1].mana_cost,
            typeLine: scryfallCard.card_faces[1].type_line,
            oracleText: scryfallCard.card_faces[1].oracle_text,
            imageUris: transferImageUris(scryfallCard.card_faces[1].image_uris),
          },
        }
      : null,
  };
}
