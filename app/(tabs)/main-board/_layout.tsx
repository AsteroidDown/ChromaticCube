import CardImportExportModal from "@/components/cards/card-import-export-modal";
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
import { Preferences } from "@/models/preferences/preferences";
import {
  faDownLeftAndUpRightToCenter,
  faEye,
  faEyeSlash,
  faFileArrowDown,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { ScrollView, View } from "react-native";

export default function CardsLayout() {
  const { setStoredCards } = useContext(StoredCardsContext);

  const [board, setBoard] = React.useState("main" as BoardType);

  const [open, setOpen] = React.useState(false);

  const [preferences, setPreferences] = React.useState({} as Preferences);
  const [hideImages, setHideImages] = React.useState(false);
  const [condensed, setCondensed] = React.useState(false);

  const tabs: TabProps[] = [
    { title: "Cards by Cost", link: "(tabs)/main-board", name: "cost" },
    { title: "Cards by Color", link: "(tabs)/main-board/color", name: "color" },
    { title: "Cards by Type", link: "(tabs)/main-board/type", name: "type" },
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
    setPreferences({ ...preferences, cardsCondensed: true });

    const storedPreferences = getLocalStoragePreferences();
    if (!storedPreferences) {
      setLocalStoragePreferences({
        cardsCondensed: true,
      });
    } else {
      setLocalStoragePreferences({
        ...storedPreferences,
        cardsCondensed: true,
      });
    }
  }

  function expandCards() {
    setCondensed(false);
    setPreferences({ ...preferences, cardsCondensed: false });

    const storedPreferences = getLocalStoragePreferences();
    if (!storedPreferences) {
      setLocalStoragePreferences({ cardsCondensed: false });
    } else {
      setLocalStoragePreferences({
        ...storedPreferences,
        cardsCondensed: false,
      });
    }
  }

  function hideCardImages() {
    setHideImages(true);
    setPreferences({ ...preferences, hideCardImages: true });

    const storedPreferences = getLocalStoragePreferences();
    if (!storedPreferences) {
      setLocalStoragePreferences({
        hideCardImages: true,
      });
    } else {
      setLocalStoragePreferences({
        ...storedPreferences,
        hideCardImages: true,
      });
    }
  }

  function showCardImages() {
    setHideImages(false);
    setPreferences({ ...preferences, hideCardImages: false });

    const storedPreferences = getLocalStoragePreferences();
    if (!storedPreferences) {
      setLocalStoragePreferences({ hideCardImages: false });
    } else {
      setLocalStoragePreferences({
        ...storedPreferences,
        hideCardImages: false,
      });
    }
  }

  return (
    <ScrollView>
      <BoardContext.Provider value={{ board, setBoard }}>
        <View className="flex gap-4 px-6 py-4 w-full h-[100vh] pb-4 bg-background-100 overflow-y-scroll">
          <CardSearch />

          <CardPreferencesContext.Provider
            value={{ preferences, setPreferences }}
          >
            <TabBar tabs={tabs}>
              <View className="flex flex-row gap-2 mx-4">
                <Tooltip
                  title={
                    hideImages ? "Expand Card Gallery" : "Condense Card Gallery"
                  }
                >
                  <Button
                    rounded
                    className="-rotate-45"
                    type={condensed ? "outlined" : "clear"}
                    icon={
                      condensed
                        ? faDownLeftAndUpRightToCenter
                        : faUpRightAndDownLeftFromCenter
                    }
                    onClick={() =>
                      condensed ? expandCards() : condenseCards()
                    }
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

                <Button
                  rounded
                  type="clear"
                  icon={faFileArrowDown}
                  onClick={() => setOpen(!open)}
                />
              </View>
            </TabBar>
          </CardPreferencesContext.Provider>
        </View>

        <CardImportExportModal open={open} setOpen={setOpen} />
      </BoardContext.Provider>
    </ScrollView>
  );
}
