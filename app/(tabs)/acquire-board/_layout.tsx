import CardSearch from "@/components/cards/card-search";
import Button from "@/components/ui/button/button";
import { TabProps } from "@/components/ui/tabs/tab";
import TabBar from "@/components/ui/tabs/tab-bar";
import { Tooltip } from "@/components/ui/tooltip/tooltip";
import BoardContext, { BoardType } from "@/contexts/cards/board.context";
import CardPreferencesContext from "@/contexts/cards/card-preferences.context";
import StoredCardsContext from "@/contexts/cards/stored-cards.context";
import { getLocalStorageStoredCards } from "@/functions/local-storage/card-local-storage";
import {
  getLocalStoragePreferences,
  setLocalStoragePreferences,
} from "@/functions/local-storage/preferences-local-storage";
import {
  faCompress,
  faExpand,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { ScrollView, View } from "react-native";

export default function AcquireBoardLayout() {
  const { setStoredCards } = useContext(StoredCardsContext);
  const { setPreferences } = useContext(CardPreferencesContext);

  const [board, setBoard] = React.useState("acquire" as BoardType);

  const [hideImages, setHideImages] = React.useState(false);
  const [condensed, setCondensed] = React.useState(false);

  const tabs: TabProps[] = [
    {
      title: "Mana Value",
      link: "(tabs)/acquire-board",
      name: "cost",
    },
    {
      title: "Color",
      link: "(tabs)/side-board/color",
      name: "color",
    },
    { title: "Type", link: "(tabs)/acquire-board/type", name: "type" },
  ];

  useEffect(() => {
    setStoredCards(getLocalStorageStoredCards(board));

    const storedPreferences = getLocalStoragePreferences();
    if (storedPreferences) setPreferences(storedPreferences);

    if (storedPreferences?.cardsCondensed) setCondensed(true);
    else setCondensed(false);

    if (storedPreferences?.hideCardImages) setHideImages(true);
    else setHideImages(false);
  }, []);

  function condenseCards() {
    setCondensed(true);
    setLocalStoragePreferences({ cardsCondensed: true });
    setPreferences(getLocalStoragePreferences() || {});
  }

  function expandCards() {
    setCondensed(false);
    setLocalStoragePreferences({ cardsCondensed: false });
    setPreferences(getLocalStoragePreferences() || {});
  }

  function hideCardImages() {
    setHideImages(true);
    setLocalStoragePreferences({ hideCardImages: true });
    setPreferences(getLocalStoragePreferences() || {});
  }

  function showCardImages() {
    setHideImages(false);
    setLocalStoragePreferences({ hideCardImages: false });
    setPreferences(getLocalStoragePreferences() || {});
  }

  return (
    <ScrollView className="bg-background-100">
      <BoardContext.Provider value={{ board, setBoard }}>
        <View className="flex gap-4 px-6 py-4 w-full h-[100vh] pb-4">
          <CardSearch />

          <TabBar tabs={tabs}>
            <View className="flex flex-row gap-2 mx-4">
              <Tooltip
                title={
                  hideImages ? "Expand Card Gallery" : "Condense Card Gallery"
                }
              >
                <Button
                  rounded
                  type={condensed ? "outlined" : "clear"}
                  icon={condensed ? faCompress : faExpand}
                  onClick={() => (condensed ? expandCards() : condenseCards())}
                />
              </Tooltip>

              <Tooltip
                title={hideImages ? "Show Card Images" : "Hide Card Images"}
              >
                <Button
                  rounded
                  type={hideImages ? "outlined" : "clear"}
                  icon={hideImages ? faEyeSlash : faEye}
                  onClick={() =>
                    hideImages ? showCardImages() : hideCardImages()
                  }
                />
              </Tooltip>
            </View>
          </TabBar>
        </View>
      </BoardContext.Provider>
    </ScrollView>
  );
}
