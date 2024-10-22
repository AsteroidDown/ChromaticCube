import { Card, CardImageUris } from "../models/card/card";
import {
  ScryfallCard,
  ScryfallImageUris,
} from "../models/scryfall/scryfall-card";

export function ScryfallToCard(scryfallCard: ScryfallCard): Card {
  function transferImageUris(imageUris: ScryfallImageUris): CardImageUris {
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
    id: scryfallCard.id,
    name: scryfallCard.name,
    count: 1,
    set: scryfallCard.set,
    collectorNumber: scryfallCard.collector_number,
    cardBackId: scryfallCard.card_back_id,
    cmc: scryfallCard.cmc,
    rarity: scryfallCard.rarity,
    colorIdentity: scryfallCard.color_identity,
    manaCost: scryfallCard.mana_cost,
    typeLine: scryfallCard.type_line,
    loyalty: scryfallCard.loyalty,
    defense: scryfallCard.defense,
    producedMana: scryfallCard.produced_mana,
    oracleText: scryfallCard.oracle_text,
    images: transferImageUris(scryfallCard.image_uris),
    legalities: scryfallCard.legalities,
    faces: scryfallCard.card_faces
      ? {
          front: {
            name: scryfallCard.card_faces[0].name,
            manaCost: scryfallCard.card_faces[0].mana_cost,
            typeLine: scryfallCard.card_faces[0].type_line,
            loyalty: scryfallCard.card_faces[0]?.loyalty,
            defense: scryfallCard.card_faces[0]?.defense,
            oracleText: scryfallCard.card_faces[0].oracle_text,
            imageUris: transferImageUris(scryfallCard.card_faces[0].image_uris),
          },
          back: {
            name: scryfallCard.card_faces[1].name,
            manaCost: scryfallCard.card_faces[1].mana_cost,
            typeLine: scryfallCard.card_faces[1].type_line,
            loyalty: scryfallCard.card_faces[1]?.loyalty,
            defense: scryfallCard.card_faces[1]?.defense,
            oracleText: scryfallCard.card_faces[1].oracle_text,
            imageUris: transferImageUris(scryfallCard.card_faces[1].image_uris),
          },
        }
      : null,
    prices: {
      usd: Number(scryfallCard.prices.usd),
      usdFoil: Number(scryfallCard.prices.usd_foil),
      usdEtched: Number(scryfallCard.prices.usd_etched),
      eur: Number(scryfallCard.prices.eur),
      eurFoil: Number(scryfallCard.prices.eur),
      tix: Number(scryfallCard.prices.tix),
    },
    priceUris: {
      tcgplayer: scryfallCard.purchase_uris.tcgplayer,
      cardmarket: scryfallCard.purchase_uris.cardmarket,
      cardhoarder: scryfallCard.purchase_uris.cardhoarder,
    },
  };
}
