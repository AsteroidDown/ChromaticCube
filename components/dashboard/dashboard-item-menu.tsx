import Box from "@/components/ui/box/box";
import Button from "@/components/ui/button/button";
import DashboardContext from "@/contexts/dashboard/dashboard.context";
import {
  getLocalStorageDashboard,
  moveDownLocalStorageDashboardItem,
  moveUpLocalStorageDashboardItem,
  removeLocalStorageDashboardItem,
  updateLocalStorageDashboardItem,
} from "@/functions/local-storage/dashboard-local-storage";
import { DashboardItem, DashboardItemSize } from "@/models/dashboard/dashboard";
import {
  faDownLong,
  faEllipsisV,
  faExpand,
  faMaximize,
  faMinimize,
  faUpLong,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import Dropdown from "../ui/dropdown/dropdown";

export interface DashboardItemMenu {
  graph: DashboardItem;
  sectionId: string;
}

export default function DashboardItemMenu({
  graph,
  sectionId,
}: DashboardItemMenu) {
  const { setDashboard } = useContext(DashboardContext);

  const [expanded, setExpanded] = React.useState(false);

  function moveGraphUp() {
    if (!graph || !sectionId) return;

    moveUpLocalStorageDashboardItem(graph.id, sectionId);
    setDashboard(getLocalStorageDashboard());
  }

  function moveGraphDown() {
    if (!graph || !sectionId) return;

    moveDownLocalStorageDashboardItem(graph.id, sectionId);
    setDashboard(getLocalStorageDashboard());
  }

  function setGraphSize(size: DashboardItemSize) {
    if (!graph || !sectionId) return;

    updateLocalStorageDashboardItem(graph.id, sectionId, { size });
    setDashboard(getLocalStorageDashboard());
    setExpanded(false);
  }

  function removeGraph() {
    if (!graph || !sectionId) return;

    removeLocalStorageDashboardItem(graph.id, sectionId);
    setDashboard(getLocalStorageDashboard());
  }

  return (
    <>
      <Button
        rounded
        icon={faEllipsisV}
        type="clear"
        action="default"
        onClick={() => setExpanded(!expanded)}
      />

      <Dropdown xOffset={-100} expanded={expanded} setExpanded={setExpanded}>
        <Box className="flex justify-start items-start !p-0 border-2 border-background-100 !bg-background-200 overflow-hidden">
          <Button
            start
            square
            type="clear"
            text="Move Up"
            className="w-full"
            icon={faUpLong}
            onClick={moveGraphUp}
          />

          <Button
            start
            square
            type="clear"
            text="Move Down"
            className="w-full"
            icon={faDownLong}
            onClick={moveGraphDown}
          />

          {graph.size !== "sm" && (
            <Button
              start
              square
              type="clear"
              text="Small"
              className="w-full"
              icon={faMinimize}
              onClick={() => setGraphSize("sm")}
            />
          )}

          {graph.size !== "md" && (
            <Button
              start
              square
              type="clear"
              text="Medium"
              className="w-full"
              icon={faExpand}
              onClick={() => setGraphSize("md")}
            />
          )}

          {graph.size !== "lg" && (
            <Button
              start
              square
              type="clear"
              text="Large"
              className="w-full"
              icon={faMaximize}
              onClick={() => setGraphSize("lg")}
            />
          )}

          <Button
            start
            square
            type="clear"
            text="Delete"
            className="w-full"
            icon={faX}
            onClick={removeGraph}
          />
        </Box>
      </Dropdown>
    </>
  );
}
