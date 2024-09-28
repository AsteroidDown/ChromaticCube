import Graph from "@/components/graph/graph";
import Box from "@/components/ui/box/box";
import Text from "@/components/ui/text/text";
import { filterCards } from "@/functions/card-filtering";
import {
  graphCardsByColor,
  graphCardsByCost,
  graphCardsByType,
} from "@/functions/card-graphing";
import { getLocalStorageStoredCards } from "@/functions/local-storage/card-local-storage";
import { titleCase } from "@/functions/text-manipulation";
import { Card } from "@/models/card/card";
import { DashboardSection } from "@/models/dashboard/dashboard";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import { View, ViewProps } from "react-native";

export type dashboardSectionProps = ViewProps & {
  section: DashboardSection;
};

export default function DashboardSectionView({
  section,
}: dashboardSectionProps) {
  const storedCards = getLocalStorageStoredCards();

  return (
    <View className="flex gap-4 justify-center items-center w-full">
      <Text
        size="2xl"
        thickness="bold"
        className="sticky top-0 py-2 pr-auto w-full bg-background-100"
      >
        {section.title}
      </Text>

      <View className="flex flex-row flex-wrap gap-4 justify-center items-center w-full z-[-1]">
        {section.graphs.map((graph, index) => (
          <View
            key={graph.title + index}
            className="flex-1 h-96 lg:min-w-[40%] min-w-full overflow-hidden"
          >
            <Box className="w-full h-full overflow-x-scroll overflow-y-hidden">
              <Graph
                title={graph.title}
                horizontalTitle={titleCase(graph.type)}
                sets={getSets(graph.type, graph.filters, storedCards)}
              />
            </Box>
          </View>
        ))}
      </View>
    </View>
  );
}

function getSets(type: string, filters: CardFilters, cards: Card[]) {
  if (type === "cost") {
    return graphCardsByCost(filterCards(cards, filters));
  } else if (type === "color") {
    return graphCardsByColor(filterCards(cards, filters));
  } else if (type === "type") {
    return graphCardsByType(filterCards(cards, filters));
  } else return [];
}
