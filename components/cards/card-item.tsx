import {
  faMinus,
  faPalette,
  faPlus,
  faShop,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";
import {
  addToLocalStorageCardCount,
  removeFromLocalStorageCardCount,
  removeLocalStorageCard,
} from "../../functions/local-storage";
import { Card } from "../../models/card/card";
import Button from "../ui/button/button";
import Divider from "../ui/divider/divider";
import Modal from "../ui/modal/modal";
import CardCost from "./card-cost";
import CardDetailedPreview from "./card-detailed-preview";
import CardImage from "./card-image";

export interface CardItemProps {
  card: Card;
  hideImage?: boolean;
}

export default function CardItem({ card, hideImage = false }: CardItemProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        className={
          "flex gap-2 rounded-2xl bg-background-300 overflow-hidden transition-all duration-300 " +
          (expanded ? "max-h-[1000px] " : "max-h-[36px] ")
        }
      >
        <CardItemHeader card={card} />

        <Divider thick className="-mt-2" />

        {!hideImage && (
          <>
            <View className="flex gap-2 px-2">
              <CardImage card={card} onClick={() => setModalOpen(true)} />
            </View>

            <Divider thick />
          </>
        )}

        <CardItemFooter card={card} />
      </Pressable>

      <Modal transparent open={modalOpen} setIsOpen={setModalOpen}>
        <CardDetailedPreview card={card}>
          <CardItemFooter card={card} />
        </CardDetailedPreview>
      </Modal>
    </>
  );
}

export function CardItemHeader({ card }: CardItemProps) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <View
      className={
        "flex flex-row gap-1 justify-between items-center px-4 max-h-[36px] h-[36px] transition-all " +
        (hovered ? "bg-primary-300" : "bg-background-300")
      }
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* <Tooltip style={[{ flex: 1 }]} message={card.name}> */}
      <View className="flex flex-row gap-2 flex-1">
        <Text className="text-white">{card.count}</Text>
        <Text className="text-white truncate">{card.name}</Text>
      </View>
      {/* </Tooltip> */}

      {card.faces ? (
        <Text className="flex flex-row items-center gap-1">
          {card.faces.front.manaCost && (
            <CardCost size="sm" cost={card.faces.front.manaCost} />
          )}

          {card.faces.back.manaCost && (
            <Text className="text-white h-[20px]"> // </Text>
          )}

          {card.faces.back.manaCost && (
            <CardCost size="sm" cost={card.faces.back.manaCost} />
          )}
        </Text>
      ) : (
        card.manaCost && <CardCost size="sm" cost={card.manaCost} />
      )}
    </View>
  );
}

export function CardItemFooter({ card }: CardItemProps) {
  return (
    <View className="flex gap-2">
      <View className="flex flex-row justify-between gap-2 px-2">
        <View className="flex flex-row justify-center items-center">
          <Button
            size="sm"
            type="clear"
            action="danger"
            icon={faMinus}
            onClick={() => removeFromLocalStorageCardCount(card)}
          />

          <Text className="text-white mx-2 font-bold">{card.count}</Text>

          <Button
            size="sm"
            type="clear"
            action="info"
            icon={faPlus}
            onClick={() => addToLocalStorageCardCount(card)}
          />
        </View>

        <Button icon={faPalette} />

        <Button
          action="danger"
          icon={faTrash}
          onClick={() => removeLocalStorageCard(card)}
        ></Button>
      </View>

      <View className="flex flex-row flex-1 gap-2 px-2 pb-2">
        <Button
          size="xs"
          action="info"
          className="flex-1"
          icon={faShop}
          text={`$${card.prices?.usd}`}
          onClick={async () => await Linking.openURL(card.priceUris.tcgplayer)}
        />

        <Button
          size="xs"
          action="info"
          className="flex-1"
          icon={faShop}
          text={`€${card.prices?.eur}`}
          onClick={async () => await Linking.openURL(card.priceUris.cardmarket)}
        />
      </View>
    </View>
  );
}
