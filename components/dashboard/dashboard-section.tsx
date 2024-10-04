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
  updateLocalStorageDashboardItem,
  updateLocalStorageDashboardSection,
} from "@/functions/local-storage/dashboard-local-storage";
import { titleCase } from "@/functions/text-manipulation";
import { Card } from "@/models/card/card";
import { DashboardSection } from "@/models/dashboard/dashboard";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import {
  faChartSimple,
  faCheck,
  faDatabase,
  faInfoCircle,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { TextInput, View, ViewProps } from "react-native";
import CardSaveAsGraphModal from "../cards/card-save-as-graph-modal";
import Placeholder from "../ui/placeholder/placeholder";
import DashboardItemMenu from "./dashboard-item-menu";

export type dashboardSectionProps = ViewProps & {
  sectionId: string;
};

export default function DashboardSectionView({
  sectionId,
}: dashboardSectionProps) {
  const { dashboard, setDashboard } = useContext(DashboardContext);

  const [addGraphOpen, setAddGraphOpen] = React.useState(false);
  const [section, setSection] = React.useState(null as DashboardSection | null);

  const [sectionTitle, setSectionTitle] = React.useState("");
  const [sectionTitleHovered, setSectionTitleHovered] = React.useState(false);
  const [editingSection, setEditingSection] = React.useState(false);

  const storedCards = getLocalStorageStoredCards();

  useEffect(
    () =>
      setSection(
        dashboard?.sections.find((section) => section.id === sectionId) || null
      ),
    [dashboard, sectionId]
  );

  function updateSectionTitle() {
    if (!section || !sectionTitle) return;

    updateLocalStorageDashboardSection(section.id, sectionTitle);
    setDashboard(getLocalStorageDashboard());
    setEditingSection(false);
  }

  function toggleStacked(graphId: string, stacked: boolean) {
    if (!section) return;

    updateLocalStorageDashboardItem(graphId, section.id, { stacked });
    setDashboard(getLocalStorageDashboard());
  }

  if (!section) return <Placeholder title="No Section Found!" />;

  return (
    <View className="flex gap-4 justify-center items-center w-full">
      <View
        className="flex flex-row gap-2 justify-between items-center py-4 w-full bg-background-100 bg-opacity-60 sticky top-0"
        onPointerEnter={() => setSectionTitleHovered(true)}
        onPointerLeave={() => setSectionTitleHovered(false)}
      >
        <View className="flex flex-row gap-2 items-center">
          {!editingSection && (
            <Text size="2xl" thickness="bold" className="py-1 pr-auto ">
              {section.title}
            </Text>
          )}

          {editingSection && (
            <TextInput
              placeholderTextColor="#8b8b8b"
              className="color-white outline-none text-2xl font-bold"
              value={sectionTitle}
              placeholder={section.title}
              onChangeText={(text) => setSectionTitle(text)}
              onKeyPress={(event) =>
                (event as any)?.code === "Enter" ? updateSectionTitle() : null
              }
            />
          )}

          <Button
            rounded
            type="clear"
            action="default"
            icon={editingSection ? faCheck : faPencil}
            className={`${
              editingSection || sectionTitleHovered
                ? "opacity-100"
                : "opacity-0"
            } transition-all duration-500`}
            onClick={() =>
              editingSection
                ? updateSectionTitle()
                : setEditingSection(!editingSection)
            }
          />
        </View>

        <View className="flex flex-row gap-2 items-center">
          <Button
            rounded
            type="clear"
            action="default"
            icon={faPlus}
            onClick={() => setAddGraphOpen(true)}
          />
        </View>
      </View>

      <View className="flex flex-row flex-wrap gap-4 justify-start items-center w-full z-[-1]">
        {section.items.map((graph, index) => (
          <View
            key={graph.title + index}
            className={`flex-1 h-80 min-w-full overflow-hidden transition-all duration-500 ${
              graph.size === "sm"
                ? "lg:min-w-[25%] lg:max-w-[33%]"
                : graph.size === "md"
                ? "lg:min-w-[50%] lg:max-w-[66%]"
                : "lg:min-w-[100%]"
            }`}
          >
            <Box className="w-full h-full !bg-background-100 border-2 border-background-300 overflow-x-scroll overflow-y-hidden">
              <Graph
                id={graph.id}
                sectionId={section.id}
                title={graph.title}
                stacked={graph.stacked}
                horizontalTitle={titleCase(graph.type)}
                sets={getSets(graph.type, graph.filters, storedCards)}
                titleStart={
                  <Button
                    rounded
                    type="clear"
                    action="default"
                    icon={graph.stacked ? faDatabase : faChartSimple}
                    onClick={() => toggleStacked(graph.id, !graph.stacked)}
                  />
                }
                titleEnd={
                  <DashboardItemMenu graph={graph} sectionId={section.id} />
                }
              />
            </Box>
          </View>
        ))}

        {!section.items.length && (
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

      <CardSaveAsGraphModal
        sectionId={section.id}
        open={addGraphOpen}
        setOpen={setAddGraphOpen}
      />
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
