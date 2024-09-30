import Graph from "@/components/graph/graph";
import Box from "@/components/ui/box/box";
import Button from "@/components/ui/button/button";
import Text from "@/components/ui/text/text";
import DashboardContext from "@/contexts/dashboard/dashboard.context";
import { filterCards } from "@/functions/card-filtering";
import {
  graphCardsByColor,
  graphCardsByCost,
  graphCardsByType,
} from "@/functions/card-graphing";
import { getLocalStorageStoredCards } from "@/functions/local-storage/card-local-storage";
import {
  getLocalStorageDashboard,
  removeLocalStorageDashboardGraph,
} from "@/functions/local-storage/dashboard-local-storage";
import { titleCase } from "@/functions/text-manipulation";
import { Card } from "@/models/card/card";
import { DashboardSection } from "@/models/dashboard/dashboard";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import { faInfoCircle, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { View, ViewProps } from "react-native";
import CardSaveAsGraphModal from "../cards/card-save-as-graph-modal";
import Placeholder from "../ui/placeholder/placeholder";

export type dashboardSectionProps = ViewProps & {
  sectionId: string;
};

export default function DashboardSectionView({
  sectionId,
}: dashboardSectionProps) {
  const { dashboard, setDashboard } = useContext(DashboardContext);

  const [addGraphOpen, setAddGraphOpen] = React.useState(false);
  const [section, setSection] = React.useState(null as DashboardSection | null);

  const storedCards = getLocalStorageStoredCards();

  useEffect(
    () =>
      setSection(
        dashboard?.sections.find((section) => section.id === sectionId) || null
      ),
    [dashboard, sectionId]
  );
  function removeGraph(graphId: string) {
    if (!section) return;

    removeLocalStorageDashboardGraph(graphId, section.id);
    setDashboard(getLocalStorageDashboard());
  }

  if (!section) return <Placeholder title="No Section Found!" />;

  return (
    <View className="flex gap-4 justify-center items-center w-full">
      <Text
        size="2xl"
        thickness="bold"
        className="sticky top-0 py-4 pr-auto w-full bg-background-100 bg-opacity-60"
      >
        {section.title}
      </Text>

      <View className="flex flex-row flex-wrap gap-4 justify-center items-center w-full z-[-1]">
        {section.graphs.map((graph, index) => (
          <View
            key={graph.title + index}
            className="flex-1 mx-auto h-96 lg:min-w-[40%] w-full overflow-hidden"
          >
            <Box className="w-full h-full overflow-x-scroll overflow-y-hidden">
              <Graph
                id={graph.id}
                sectionId={section.id}
                title={graph.title}
                horizontalTitle={titleCase(graph.type)}
                sets={getSets(graph.type, graph.filters, storedCards)}
                titleEnd={
                  <Button
                    rounded
                    icon={faX}
                    type="clear"
                    action="default"
                    onClick={() => removeGraph(graph.id)}
                  />
                }
              />
            </Box>
          </View>
        ))}

        {!section.graphs.length && (
          <Placeholder
            title="No Graphs Added!"
            subtitle="Add some to get started"
            icon={faInfoCircle}
          >
            <Button
              text="Add Graph"
              className="mt-4"
              icon={faPlus}
              onClick={() => setAddGraphOpen(true)}
            ></Button>
          </Placeholder>
        )}
      </View>

      <CardSaveAsGraphModal open={addGraphOpen} setOpen={setAddGraphOpen} />
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
