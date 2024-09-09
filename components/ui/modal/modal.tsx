import React from "react";
import { Pressable, Modal as ReactModal, View, ViewProps } from "react-native";
import Box from "../box/box";

export type ModalProps = ViewProps & {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  transparent?: boolean;
};

export default function Modal({
  open,
  setIsOpen,
  transparent = false,
  className,
  children,
}: ModalProps) {
  const transParentClasses = transparent
    ? "!bg-opacity-0 !border-none shadow-none"
    : "";

  return (
    <>
      {open && (
        <Pressable onPress={() => setIsOpen(false)}>
          <ReactModal transparent style={[{ opacity: 0 }]}>
            <View
              className={
                "flex justify-center items-center bg-dark-100 w-full h-full " +
                (open ? "bg-opacity-30" : "bg-opacity-0")
              }
            >
              <Box
                className={`
                  ${className} ${transParentClasses}
                   bg-background-400 shadow-lg border-dark-200 border-2 
                  ${open ? "opacity-100" : "opacity-0"}`}
              >
                {children}
              </Box>
            </View>
          </ReactModal>
        </Pressable>
      )}
    </>
  );
}
