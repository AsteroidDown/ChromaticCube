import CardSearch from "@/components/cards/card-search";
import { TabProps } from "@/components/ui/tabs/tab";
import TabBar from "@/components/ui/tabs/tab-bar";
import StoredCardsContext from "@/contexts/cards/stored-cards.context";
import { Card } from "@/models/card/card";
import React from "react";
import { ScrollView, View } from "react-native";

export default function CardsLayout() {
  const [storedCards, setStoredCards] = React.useState([] as Card[]);

  const tabs: TabProps[] = [
    { title: "Cards by Cost", link: "(tabs)/maybe-board", name: "cost" },
    {
      title: "Cards by Color",
      link: "(tabs)/maybe-board/color",
      name: "color",
    },
    { title: "Cards by Type", link: "(tabs)/maybe-board/type", name: "type" },
  ];

  return (
    <ScrollView>
      <StoredCardsContext.Provider
        value={{ maybeBoard: true, storedCards, setStoredCards }}
      >
        <View className="flex gap-4 px-6 py-4 w-full h-[100vh] pb-4 bg-background-100 overflow-y-scroll">
          <CardSearch />
          <TabBar tabs={tabs}></TabBar>
        </View>
      </StoredCardsContext.Provider>
    </ScrollView>
  );
}
