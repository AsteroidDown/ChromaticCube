import { Image, Text, View } from "react-native";
import { Card } from "../../models/card";
import Box from "../ui/box/box";
import Divider from "../ui/divider/divider";

export interface CardDetailsProps {
  card: Card | null;
}

export default function CardDetails({ card }: CardDetailsProps) {
  if (!card) {
    return (
      <Box>
        <Text className="text-white">No Card Found</Text>
      </Box>
    );
  }

  return (
    <Box classes="flex flex-row gap-3">
      <Image
        className="h-[350px] aspect-[2.5/3.5]"
        source={{ uri: card.images.png }}
        style={[{ resizeMode: "contain" }]}
      />

      <Box classes="flex gap-3 w-[360px]" shade={300}>
        <View className="flex flex-row">
          <Text className="text-white font-bold flex-1">Name</Text>
          <Text className="text-white flex-[4]">{card.name}</Text>
        </View>

        <Divider />

        <View className="flex flex-row">
          <Text className="text-white font-bold flex-1">Cost</Text>
          <Text className="text-white flex-[4]">{card.manaCost}</Text>
        </View>

        <Divider />

        <View className="flex flex-row">
          <Text className="text-white font-bold flex-1">Type</Text>
          <Text className="text-white flex-[4]">{card.typeLine}</Text>
        </View>
      </Box>
    </Box>
  );
}
