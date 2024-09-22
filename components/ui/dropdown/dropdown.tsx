import DropdownContext from "@/contexts/ui/dropdown.context";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, Pressable, View, ViewProps } from "react-native";

export type DropdownProps = ViewProps & {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;

  xOffset?: number;
  disableCloseOnClick?: boolean;
};

export default function Dropdown({
  expanded,
  setExpanded,
  xOffset = 0,
  disableCloseOnClick = false,
  className,
  children,
}: DropdownProps) {
  return (
    <DropdownContext.Provider value={{ expanded, setExpanded }}>
      <DropdownContent
        xOffset={xOffset}
        children={children}
        className={className}
        disableCloseOnClick={disableCloseOnClick}
      />
    </DropdownContext.Provider>
  );
}

type DropdownContentProps = ViewProps & {
  xOffset: number;
  disableCloseOnClick: boolean;
};

function DropdownContent({
  xOffset,
  disableCloseOnClick,
  className,
  children,
}: DropdownContentProps) {
  const { expanded, setExpanded } = useContext(DropdownContext);

  const buttonRef = useRef<View>(null);
  const dropdownRef = useRef<View>(null);

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const [open, setOpen] = useState(false);
  const [toTop, setToTop] = useState(false);

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
                className="flex-1 cursor-default"
                onPress={() => setExpanded(!expanded)}
              >
                <View
                  style={{ top, left }}
                  ref={dropdownRef}
                  onLayout={() => {
                    dropdownRef.current?.measureInWindow(
                      (_fx, _fy, _width, height) => {
                        if (top + height > window.innerHeight) {
                          setToTop(true);
                          setTop(top - height - 48);
                        }
                      }
                    );
                  }}
                >
                  <Pressable
                    className={`max-w-fit overflow-y-hidden ${
                      open ? "max-h-fit" : "max-h-[0px]"
                    }`}
                    style={{ marginLeft: xOffset }}
                    onPress={() =>
                      !disableCloseOnClick ? setExpanded(!expanded) : null
                    }
                  >
                    <View
                      className={
                        open
                          ? "translate-y-[0%] transition-all duration-300"
                          : toTop
                          ? "translate-y-[100%]"
                          : "translate-y-[-100%]"
                      }
                    >
                      <View className={className}>{children}</View>
                    </View>
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
