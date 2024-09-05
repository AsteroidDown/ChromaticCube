import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Card } from "../../models/card";
import Box from "../ui/box/box";
import Divider from "../ui/divider/divider";
import CardCost from "./card-cost";
import CardText from "./card-text";

export interface CardDetailsProps {
  card: Card | null;
}

export default function CardDetails({ card }: CardDetailsProps) {
  const [showFront, setShowFront] = React.useState(true);

  if (!card) {
    return (
      <Box>
        <Text className="text-white">No Card Found</Text>
      </Box>
    );
  }

  return (
    <Box classes="flex flex-row flex-wrap justify-center gap-3 !rounded-2xl">
      <View>
        <Pressable
          onPress={() => (card.faces ? setShowFront(!showFront) : null)}
        >
          <Image
            className="h-[350px] hover:h-[355px] hover:-my-[2.5px] hover:-mx-[2px] aspect-[2.5/3.5] rounded transition-all"
            source={{
              uri:
                card.images?.png ||
                (showFront
                  ? card.faces?.front.imageUris.png
                  : card.faces?.back.imageUris.png),
            }}
            style={[{ resizeMode: "contain" }]}
          />
        </Pressable>
      </View>

      <Box classes="flex gap-3 w-[350px]" shade={300}>
        <View className="flex flex-row gap-2">
          <Text className="text-white font-bold flex-1">Name</Text>
          <Text className="text-white flex-[3]">
            {card.faces
              ? showFront
                ? card.faces.front.name
                : card.faces.back.name
              : card.name}
          </Text>
        </View>

        {(card.manaCost ||
          (showFront && card.faces?.front.manaCost) ||
          (!showFront && card.faces?.back.manaCost)) && (
          <>
            <Divider />

            <View className="flex flex-row gap-2">
              <Text className="text-white font-bold flex-1">Cost</Text>
              <View className="flex-[3]">
                <CardCost
                  cost={
                    card.faces
                      ? showFront
                        ? card.faces.front.manaCost
                        : card.faces.back.manaCost
                      : card.manaCost
                  }
                />
              </View>
            </View>
          </>
        )}

        <Divider />

        <View className="flex flex-row gap-2">
          <Text className="text-white font-bold flex-1">Type</Text>
          <Text className="text-white flex-[3]">
            {card.faces
              ? showFront
                ? card.faces.front.typeLine
                : card.faces.back.typeLine
              : card.typeLine}
          </Text>
        </View>

        {card.producedMana &&
          (card.oracleText?.includes("add") ||
            card.oracleText?.includes("Add")) && (
            <>
              <Divider />

              <View className="flex flex-row gap-2">
                <Text className="text-white font-bold flex-1">Produces</Text>
                <View className="flex-[3]">
                  <CardCost cost={"{" + card.producedMana.join("}{") + "}"} />
                </View>
              </View>
            </>
          )}

        <Divider />

        <View className="flex flex-row gap-2">
          <Text className="text-white font-bold flex-1">Text</Text>
          <View className="flex-[3]">
            <CardText
              text={
                card.oracleText ||
                (showFront
                  ? card.faces?.front.oracleText
                  : card.faces?.back.oracleText) ||
                ""
              }
            />
          </View>
        </View>
      </Box>
    </Box>
  );
}
