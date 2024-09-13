import { ScrollView, View } from "react-native";
import CardSearch from "../../../components/cards/card-search";
import { TabProps } from "../../../components/ui/tabs/tab";
import TabBar from "../../../components/ui/tabs/tab-bar";

export default function CardsLayout() {
  const tabs: TabProps[] = [
    { title: "Cards by Cost", link: "(tabs)/cards", name: "cost" },
    { title: "Cards by Color", link: "(tabs)/cards/color", name: "color" },
    // { title: "Cards by Type" },
  ];

  return (
    <ScrollView>
      <View className="flex gap-4 px-6 py-4 w-full h-[100vh] pb-4 bg-background-100 overflow-y-scroll">
        <CardSearch />
        <TabBar tabs={tabs}></TabBar>
      </View>
    </ScrollView>
  );
}
