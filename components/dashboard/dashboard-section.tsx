import { Graph } from "@/components/graph/graph";
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
    <View className="flex gap-4 justify-center items-center">
      <Text size="2xl" thickness="bold">
        {section.title}
      </Text>

      {section.graphs.map((graph, index) => (
        <Box
          key={graph.title + index}
          className="max-w-full overflow-x-scroll overflow-y-hidden"
        >
          <Graph
            title={graph.title}
            horizontalTitle={titleCase(graph.type)}
            sets={getSets(graph.type, graph.filters, storedCards)}
          />
        </Box>
      ))}
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
