import CardImportExportModal from "@/components/cards/card-import-export-modal";
import CardSearch from "@/components/cards/card-search";
import Button from "@/components/ui/button/button";
import { TabProps } from "@/components/ui/tabs/tab";
import TabBar from "@/components/ui/tabs/tab-bar";
import StoredCardsContext from "@/contexts/cards/stored-cards.context";
import { Card } from "@/models/card/card";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ScrollView, View } from "react-native";

export default function CardsLayout() {
  const [open, setOpen] = React.useState(false);
  const [storedCards, setStoredCards] = React.useState([] as Card[]);

  const tabs: TabProps[] = [
    { title: "Cards by Cost", link: "(tabs)/main-board", name: "cost" },
    { title: "Cards by Color", link: "(tabs)/main-board/color", name: "color" },
    { title: "Cards by Type", link: "(tabs)/main-board/type", name: "type" },
  ];

  return (
    <ScrollView>
      <StoredCardsContext.Provider
        value={{ maybeBoard: false, storedCards, setStoredCards }}
      >
        <View className="flex gap-4 px-6 py-4 w-full h-[100vh] pb-4 bg-background-100 overflow-y-scroll">
          <CardSearch />

          <TabBar tabs={tabs}>
            <View className="mx-4">
              <Button
                rounded
                type="clear"
                icon={faFileArrowDown}
                onClick={() => setOpen(!open)}
              />
            </View>
          </TabBar>
        </View>

        <CardImportExportModal open={open} setOpen={setOpen} />
      </StoredCardsContext.Provider>
    </ScrollView>
  );
}
