import Box from "@/components/ui/box/box";
import Button from "@/components/ui/button/button";
import Dropdown from "@/components/ui/dropdown/dropdown";
import ScryfallService from "@/hooks/scryfall.service";
import { Card } from "@/models/card/card";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";

export interface CardPrintsProps {
  card?: Card;
  setCard: React.Dispatch<React.SetStateAction<Card | undefined>>;
  iconOnly?: boolean;
  disabled?: boolean;
}

export default function CardPrints({
  card,
  setCard,
  iconOnly = false,
  disabled = false,
}: CardPrintsProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [hoverIndex, setHoverIndex] = React.useState(null as number | null);

  const [cardPrints, setCardPrints] = React.useState([] as Card[]);

  useEffect(() => {
    if (!card) return;

    getCardArts(card);
  }, [card, disabled]);

  async function getCardArts(card: Card) {
    if (disabled) return;

    ScryfallService.getCardPrints(card.name).then((prints) =>
      setCardPrints(prints)
    );
  }

  return (
    <View>
      <Button
        icon={faPalette}
        text={iconOnly ? undefined : "Select Print"}
        disabled={disabled || !card || (cardPrints.length || 0) < 2}
        onClick={() => setExpanded(!expanded)}
      ></Button>

      <Dropdown
        className={`max-w-[412px] border-2 border-primary-200 rounded-2xl shadow-xl ${
          iconOnly ? "-ml-40" : "-ml-20"
        }`}
        expanded={expanded}
        setExpanded={setExpanded}
      >
        <Box className="pb-6 overflow-hidden">
          <Text className="text-lg font-bold text-white mb-2">{`Available Prints (${cardPrints.length})`}</Text>

          <View className="flex flex-row flex-wrap gap-2 max-h-[300px] rounded-xl overflow-y-auto ">
            {cardPrints.map((print, index) => (
              <Pressable
                className={`flex gap-2 p-2 rounded-lg transition-all duration-300 ${
                  hoverIndex === index ? "bg-primary-300" : "bg-background-300"
                }`}
                key={print.id + index}
                onPointerEnter={() => setHoverIndex(index)}
                onPointerLeave={() => setHoverIndex(null)}
                onPress={() => {
                  setCard(print);
                  setExpanded(false);
                }}
              >
                <Image
                  className="h-56 w-40"
                  source={{
                    uri: print.images?.png || print.faces?.front.imageUris.png,
                  }}
                />

                <View className="flex flex-row justify-center items-center gap-2">
                  <Text className="text-white font-semibold">
                    {print.set.toUpperCase()}
                  </Text>

                  <Text className="text-white font-semibold">
                    {print.collectorNumber.toUpperCase()}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </Box>
      </Dropdown>
    </View>
  );
}