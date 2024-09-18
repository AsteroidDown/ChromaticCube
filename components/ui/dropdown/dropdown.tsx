import DropdownContext from "@/contexts/ui/dropdown.context";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, Pressable, View, ViewProps } from "react-native";

export type DropdownProps = ViewProps & {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  disableCloseOnClick?: boolean;
};

export default function Dropdown({
  expanded,
  setExpanded,
  disableCloseOnClick = false,
  className,
  children,
}: DropdownProps) {
  return (
    <DropdownContext.Provider value={{ expanded, setExpanded }}>
      <DropdownContent
        children={children}
        className={className}
        disableCloseOnClick={disableCloseOnClick}
      />
    </DropdownContext.Provider>
  );
}

type DropdownContentProps = ViewProps & {
  disableCloseOnClick?: boolean;
};

function DropdownContent({
  disableCloseOnClick,
  className,
  children,
}: DropdownContentProps) {
  const { expanded, setExpanded } = useContext(DropdownContext);

  const buttonRef = useRef<View>(null);

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setOpen(expanded), 10);
  }, [expanded]);

  return (
    <>
      {expanded && (
        <View
          ref={buttonRef}
          onLayout={() => {
            buttonRef.current?.measureInWindow((fx, fy) => {
              setTop(fy + 4);
              setLeft(fx);
            });
          }}
        >
          {top && left ? (
            <Modal transparent>
              <Pressable
                className="flex-1"
                onPress={() => setExpanded(!expanded)}
              >
                <View style={{ top, left }}>
                  <Pressable
                    className={`max-w-fit overflow-hidden transition-all duration-300 ${
                      open ? "max-h-[1000px]" : "max-h-[0px]"
                    } ${className}`}
                    onPress={() =>
                      !disableCloseOnClick ? setExpanded(!expanded) : null
                    }
                  >
                    {children}
                  </Pressable>
                </View>
              </Pressable>
            </Modal>
          ) : null}
        </View>
      )}
    </>
  );
}
