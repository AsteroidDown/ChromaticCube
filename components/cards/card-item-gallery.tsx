import { Text, View } from "react-native";
import { sortCardsByCost } from "../../functions/card-sorting";
import { Card } from "../../models/card/card";
import Box from "../ui/box/box";
import Divider from "../ui/divider/divider";
import CardItem from "./card-item";

export interface CardItemGalleryProps {
  cards: Card[];
}

export default function CardItemGallery({ cards }: CardItemGalleryProps) {
  const sortedCards = sortCardsByCost(cards);

  return (
    <Box classes="flex flex-row w-full overflow-x-scroll overflow-y-hidden min-h-[500px]">
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
      <View className="flex justify-center items-center mx-2">
        <Text className="text-white font-bold text-lg">{title}</Text>

        <Text className="text-white font-semibold text-sm">
          {cards.length} Card{cards.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <Divider thick />

      <View className="flex gap-2 mx-2">
        {cards.map((card, index) => (
          <CardItem card={card} key={card.id + index} />
        ))}
      </View>
    </View>
  );
}
