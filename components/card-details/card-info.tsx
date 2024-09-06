import { Text, View } from "react-native";
import { Card } from "../../models/card";
import Divider from "../ui/divider/divider";
import CardCost from "./card-cost";
import CardText from "./card-text";

export interface CardInfoProps {
  card?: Card;
}

export function CardInfo({ card }: CardInfoProps) {
  return (
    <View className="flex gap-3">
      <View className="flex flex-row gap-2">
        <Text className="text-white font-bold flex-1">Name</Text>
        <Text className="text-white flex-[3]">
          {card?.name || "Something cool probably"}
        </Text>
      </View>

      {card?.manaCost && (
        <>
          <Divider />

          <View className="flex flex-row gap-2">
            <Text className="text-white font-bold flex-1">Cost</Text>
            <View className="flex-[3]">
              <CardCost cost={card.manaCost} />
            </View>
          </View>
        </>
      )}

      <Divider />

      <View className="flex flex-row gap-2">
        <Text className="text-white font-bold flex-1">Type</Text>
        <Text className="text-white flex-[3]">
          {card?.typeLine || "Creature - Awesome"}
        </Text>
      </View>

      {card?.producedMana && (
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
          <CardText text={card?.oracleText || "{T}: You win the game!"} />
        </View>
      </View>
    </View>
  );
}

export function CardFrontInfo({ card }: CardInfoProps) {
  return (
    <View className="flex gap-3">
      <View className="flex flex-row gap-2">
        <Text className="text-white font-bold flex-1">Name</Text>
        <Text className="text-white flex-[3]">
          {card?.faces?.front.name || ""}
        </Text>
      </View>

      {card?.faces?.front.manaCost && (
        <>
          <Divider />

          <View className="flex flex-row gap-2">
            <Text className="text-white font-bold flex-1">Cost</Text>
            <View className="flex-[3]">
              <CardCost cost={card?.faces?.front?.manaCost || ""} />
            </View>
          </View>
        </>
      )}

      <Divider />

      <View className="flex flex-row gap-2">
        <Text className="text-white font-bold flex-1">Type</Text>
        <Text className="text-white flex-[3]">
          {card?.faces?.front.typeLine || ""}
        </Text>
      </View>

      {/* {card?.producedMana &&
        card?.faces?.front?.oracleText.toLowerCase().includes("add") && (
          <>
            <Divider />

            <View className="flex flex-row gap-2">
              <Text className="text-white font-bold flex-1">Produces</Text>
              <View className="flex-[3]">
                <CardCost cost={"{" + card.producedMana.join("}{") + "}"} />
              </View>
            </View>
          </>
        )} */}

      <Divider />

      <View className="flex flex-row gap-2">
        <Text className="text-white font-bold flex-1">Text</Text>
        <View className="flex-[3]">
          <CardText text={card?.faces?.front.oracleText || ""} />
        </View>
      </View>
    </View>
  );
}

export function CardBackInfo({ card }: CardInfoProps) {
  return (
    <View className="flex gap-3">
      <View className="flex flex-row gap-2">
        <Text className="text-white font-bold flex-1">Name</Text>
        <Text className="text-white flex-[3]">
          {card?.faces?.back.name || ""}
        </Text>
      </View>

      {card?.faces?.back.manaCost && (
        <>
          <Divider />

          <View className="flex flex-row gap-2">
            <Text className="text-white font-bold flex-1">Cost</Text>
            <View className="flex-[3]">
              <CardCost cost={card?.faces?.back?.manaCost || ""} />
            </View>
          </View>
        </>
      )}

      <Divider />

      <View className="flex flex-row gap-2">
        <Text className="text-white font-bold flex-1">Type</Text>
        <Text className="text-white flex-[3]">
          {card?.faces?.back.typeLine || ""}
        </Text>
      </View>

      {/* {card?.producedMana &&
        card?.faces?.back?.oracleText.toLowerCase().includes("add") && (
          <>
            <Divider />

            <View className="flex flex-row gap-2">
              <Text className="text-white font-bold flex-1">Produces</Text>
              <View className="flex-[3]">
                <CardCost cost={"{" + card.producedMana.join("}{") + "}"} />
              </View>
            </View>
          </>
        )} */}

      <Divider />

      <View className="flex flex-row gap-2">
        <Text className="text-white font-bold flex-1">Text</Text>
        <View className="flex-[3]">
          <CardText text={card?.faces?.back.oracleText || ""} />
        </View>
      </View>
    </View>
  );
}
