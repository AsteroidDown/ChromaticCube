import Button from "@/components/ui/button/button";
import Divider from "@/components/ui/divider/divider";
import Modal from "@/components/ui/modal/modal";
import Text from "@/components/ui/text/text";
import { Tooltip } from "@/components/ui/tooltip/tooltip";
import BoardContext from "@/contexts/cards/board.context";
import StoredCardsContext from "@/contexts/cards/stored-cards.context";
import {
  addToLocalStorageCardCount,
  getLocalStorageStoredCards,
  removeFromLocalStorageCardCount,
  removeLocalStorageCard,
  saveLocalStorageCard,
  switchLocalStorageCardPrint,
} from "@/functions/local-storage/card-local-storage";
import { Card } from "@/models/card/card";
import {
  faCircleInfo,
  faMinus,
  faPlus,
  faRightFromBracket,
  faShop,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { Linking, Pressable, View } from "react-native";
import CardCost from "./card-cost";
import CardDetailedPreview from "./card-detailed-preview";
import CardImage from "./card-image";
import CardPrints from "./card-prints";

export interface CardItemProps {
  card: Card;
  condensed?: boolean;
  hideImage?: boolean;
}

export default function CardItem({
  card,
  condensed = false,
  hideImage = false,
}: CardItemProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  return (
    <>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`flex gap-2 rounded-2xl overflow-hidden transition-all duration-300 outline-none ${
          expanded
            ? "max-h-[1000px] "
            : condensed
            ? "max-h-[24px]"
            : "max-h-[36px]"
        } ${
          expanded
            ? "bg-background-300"
            : condensed
            ? "bg-none"
            : "bg-background-300"
        }`}
      >
        <CardItemHeader card={card} condensed={condensed} focused={focused} />

        <Divider thick className="-mt-2" />

        {!hideImage && (
          <>
            <View className={"flex gap-2 px-2"}>
              <CardImage
                card={card}
                focusable={expanded}
                onClick={() => setModalOpen(true)}
              />
            </View>

            <Divider thick />
          </>
        )}

        <CardItemFooter
          card={card}
          expanded={expanded}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </Pressable>

      <Modal transparent open={modalOpen} setOpen={setModalOpen}>
        <CardDetailedPreview card={card}>
          <CardItemFooter card={card} />
        </CardDetailedPreview>
      </Modal>
    </>
  );
}

export function CardItemHeader({
  card,
  condensed,
  focused,
}: CardItemProps & { focused: boolean }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <View
      className={`flex flex-row gap-1 justify-between items-center transition-all ${
        condensed ? "px-2 max-h-[24px] h-[24px]" : "px-4 max-h-[36px] h-[36px]"
      } ${focused ? "bg-primary-300" : ""}
        ${
          hovered
            ? "bg-primary-300"
            : condensed
            ? "bg-none"
            : "bg-background-300"
        }`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <View className="flex flex-row gap-2 flex-1">
        <Text>{card.count}</Text>
        <Text className="truncate">{card.name}</Text>
      </View>

      {card.faces ? (
        <Text className="flex flex-row items-center gap-1">
          {card.faces.front.manaCost && (
            <CardCost size="sm" cost={card.faces.front.manaCost} />
          )}

          {card.faces.back.manaCost && <Text className="h-[20px]"> // </Text>}

          {card.faces.back.manaCost && (
            <CardCost size="sm" cost={card.faces.back.manaCost} />
          )}
        </Text>
      ) : card.manaCost ? (
        <CardCost size="sm" cost={card.manaCost} />
      ) : null}
    </View>
  );
}

export function CardItemFooter({
  card,
  expanded,
  modalOpen,
  setModalOpen,
}: any) {
  const { board } = useContext(BoardContext);
  const { setStoredCards } = useContext(StoredCardsContext);

  const [print, setPrint] = React.useState(undefined as Card | undefined);

  useEffect(() => {
    if (!print) return;

    switchPrint(card, print);
  }, [print]);

  function addToCount(card: Card) {
    addToLocalStorageCardCount(card, board);
    setStoredCards(getLocalStorageStoredCards(board));
  }

  function removeFromCount(card: Card) {
    removeFromLocalStorageCardCount(card, board);
    setStoredCards(getLocalStorageStoredCards(board));
  }

  function removeCard(card: Card) {
    removeLocalStorageCard(card, board);
    setStoredCards(getLocalStorageStoredCards(board));
  }

  function switchPrint(card: Card, print: Card) {
    switchLocalStorageCardPrint(card, print, board);
    setStoredCards(getLocalStorageStoredCards(board));
  }

  function moveCard(card: Card) {
    const moveToBoard = board === "main" ? "maybe" : "main";
    saveLocalStorageCard(card, card.count, moveToBoard);
    removeLocalStorageCard(card, board);
    setStoredCards(getLocalStorageStoredCards(board));
  }

  return (
    <View className="flex gap-2">
      <View className="flex flex-row justify-center items-center gap-2 px-2">
        <Button
          action="info"
          className="flex-1"
          tabbable={expanded}
          icon={faCircleInfo}
          onClick={() => setModalOpen(!modalOpen)}
        ></Button>

        <CardPrints
          iconOnly
          card={card}
          setCard={setPrint}
          disabled={!expanded}
          tabbable={expanded}
        />

        <Tooltip title="Move to Maybe Board">
          <Button
            action="warning"
            className="flex-1"
            tabbable={expanded}
            icon={faRightFromBracket}
            onClick={() => moveCard(card)}
          ></Button>
        </Tooltip>

        <Button
          action="danger"
          className="flex-1"
          icon={faTrash}
          tabbable={expanded}
          onClick={() => removeCard(card)}
        ></Button>
      </View>

      <View className="flex flex-row justify-between items-center px-2">
        <Button
          squareRight
          size="sm"
          type="outlined"
          action="danger"
          className="flex-1"
          icon={faMinus}
          tabbable={expanded}
          onClick={() => removeFromCount(card)}
        />

        <View className="flex justify-center items-center px-4 h-full border-2 border-x-0 border-dark-500">
          <Text thickness="bold">{card.count}</Text>
        </View>

        <Button
          squareLeft
          size="sm"
          type="outlined"
          action="info"
          className="flex-1"
          icon={faPlus}
          tabbable={expanded}
          onClick={() => addToCount(card)}
        />
      </View>

      <View className="flex flex-row flex-1 gap-2 px-2 pb-2">
        <Button
          size="xs"
          action="info"
          className="flex-1"
          icon={faShop}
          tabbable={expanded}
          text={`$${card.prices?.usd}`}
          onClick={async () => await Linking.openURL(card.priceUris.tcgplayer)}
        />

        <Button
          size="xs"
          action="info"
          className="flex-1"
          icon={faShop}
          tabbable={expanded}
          text={`€${card.prices?.eur}`}
          onClick={async () => await Linking.openURL(card.priceUris.cardmarket)}
        />
      </View>
    </View>
  );
}
