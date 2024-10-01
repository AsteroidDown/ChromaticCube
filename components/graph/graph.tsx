import Button from "@/components/ui/button/button";
import Text from "@/components/ui/text/text";
import DashboardContext from "@/contexts/dashboard/dashboard.context";
import {
  getLocalStorageDashboard,
  updateLocalStorageDashboardGraph,
} from "@/functions/local-storage/dashboard-local-storage";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";
import React, { ReactNode, useContext } from "react";
import { TextInput, View, ViewProps } from "react-native";
import { GraphHorizontalAxis } from "./layout/graph-horizontal-axis";
import { GraphPlot, SetData } from "./layout/graph-plot";
import { GraphVerticalAxis } from "./layout/graph-vertical-axis";

export type GraphProps = ViewProps & {
  id: string;
  sectionId: string;
  title?: string;
  titleStart?: ReactNode;
  titleEnd?: ReactNode;
  stacked?: boolean;
  horizontalTitle?: string;
  verticalTitle?: string;
  sets: SetData[];
};

export default function Graph({
  id,
  sectionId,
  title,
  titleStart,
  titleEnd,
  stacked,
  verticalTitle,
  horizontalTitle,
  className,
  sets,
}: GraphProps) {
  const { setDashboard } = useContext(DashboardContext);

  const [hovered, setHovered] = React.useState(false);

  const [editingGraph, setEditingGraph] = React.useState(false);
  const [graphTitleHovered, setGraphTitleHovered] = React.useState(false);
  const [graphTitle, setGraphTitle] = React.useState("");

  const maxValue = sets.reduce((acc, set) => {
    const setValue = stacked
      ? set.data.reduce((acc, entry) => acc + entry.count, 0)
      : set.data.reduce((acc, entry) => {
          if (entry.count > acc) return entry.count;
          return acc;
        }, 0);

    if (setValue > acc) return setValue;
    return acc;
  }, 0);

  const ceiling =
    maxValue > 45
      ? Math.ceil(maxValue / 10) * 10
      : maxValue > 10
      ? Math.ceil(maxValue / 5) * 5
      : Math.ceil(maxValue / 2) * 2 + 2;

  const verticalTickLength = ceiling > 45 ? 10 : ceiling > 12 ? 5 : 2;

  function updateGraphTitle() {
    if (!id || !sectionId) return;

    if (graphTitle) {
      updateLocalStorageDashboardGraph(id, sectionId, { title: graphTitle });
      setDashboard(getLocalStorageDashboard());
    }

    setEditingGraph(false);
  }

  return (
    <View
      className={`
        ${className} flex flex-1 w-full h-full overflow-auto
      `}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <View className="flex flex-row w-full items-center">
        {titleStart && (
          <View className={`-mt-4 transition-all`}>{titleStart}</View>
        )}

        <View className="flex-1 flex-row justify-center items-center mx-auto pl-10">
          {!editingGraph && (
            <Text
              size="xl"
              thickness="bold"
              className="max-h-fit text-center mx-4 mt-2 mb-6"
            >
              {title}
            </Text>
          )}

          {editingGraph && (
            <TextInput
              placeholderTextColor="#8b8b8b"
              className="color-white outline-none text-xl font-bold mx-4 mt-2 mb-6"
              value={graphTitle}
              placeholder={title}
              onChangeText={(text) => setGraphTitle(text)}
              onKeyPress={(event) =>
                (event as any)?.code === "Enter" ? updateGraphTitle() : null
              }
            />
          )}

          <Button
            rounded
            type="clear"
            action="default"
            icon={editingGraph ? faCheck : faPencil}
            className={`${
              editingGraph || hovered ? "opacity-100" : "opacity-0"
            } -mt-4 transition-all`}
            onClick={() =>
              editingGraph ? updateGraphTitle() : setEditingGraph(!editingGraph)
            }
          />
        </View>

        {titleEnd && (
          <View
            className={`${
              hovered ? "opacity-100" : "opacity-0"
            } -mt-4 transition-all`}
          >
            {titleEnd}
          </View>
        )}
      </View>

      <View className="flex-1 flex flex-row">
        <GraphVerticalAxis
          className="w-3 mr-3"
          title={verticalTitle}
          ceiling={ceiling}
          tickLength={verticalTickLength}
        ></GraphVerticalAxis>

        <GraphPlot
          className="flex-[5]"
          sets={sets}
          ceiling={ceiling}
          stacked={stacked}
          yTickLength={verticalTickLength}
        ></GraphPlot>
      </View>

      <GraphHorizontalAxis
        sets={sets}
        title={horizontalTitle}
      ></GraphHorizontalAxis>
    </View>
  );
}
export { SetData };
