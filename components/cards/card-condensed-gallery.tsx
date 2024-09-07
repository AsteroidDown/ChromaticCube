import { Text, View } from "react-native";
import { sortCardsByCost } from "../../functions/card-sorting";
import { Card } from "../../models/card";
import Box from "../ui/box/box";
import Divider from "../ui/divider/divider";
import CardCondensed from "./card-condensed";

export interface CardCondensedGalleryProps {
  cards: Card[];
}

export default function CardCondensedGallery({
  cards,
}: CardCondensedGalleryProps) {
  const sortedCards = sortCardsByCost(cards);

  return (
    <Box classes="flex flex-row w-full min-h-[500px] overflow-x-scroll overflow-y-hidden">
      {sortedCards.zero?.length > 0 && (
        <CardCondensedGalleryColumn title="0 Cost" cards={sortedCards.zero} />
      )}
      <CardCondensedGalleryColumn title="1 Cost" cards={sortedCards.one} />
      <CardCondensedGalleryColumn title="2 Cost" cards={sortedCards.two} />
      <CardCondensedGalleryColumn title="3 Cost" cards={sortedCards.three} />
      <CardCondensedGalleryColumn title="4 Cost" cards={sortedCards.four} />
      <CardCondensedGalleryColumn title="5 Cost" cards={sortedCards.five} />
      <CardCondensedGalleryColumn title="6 Cost" cards={sortedCards.six} />
      <CardCondensedGalleryColumn title="7+ Cost" cards={sortedCards.seven} />
      {sortedCards.land?.length > 0 && (
        <CardCondensedGalleryColumn title="Lands" cards={sortedCards.land} />
      )}
    </Box>
  );
}

export interface CardCondensedGalleryColumnProps {
  title: string;
  cards: Card[];
}

export function CardCondensedGalleryColumn({
  title,
  cards,
}: CardCondensedGalleryColumnProps) {
  const columnClasses = "flex gap-2 w-[256px] max-w-[256px]";

  return (
    <View className={columnClasses}>
      <Text className="text-white font-bold text-lg text-center mx-2">
        {title}
      </Text>

      <Divider thick />

      <View className="flex gap-2 mx-2">
        {cards.map((card, index) => (
          <CardCondensed card={card} key={card.id + index} />
        ))}
      </View>
    </View>
  );
}
