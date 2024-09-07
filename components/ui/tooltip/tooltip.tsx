import { useState } from "react";
import { Text, View, type ViewProps } from "react-native";

export type TooltipProps = ViewProps & {
  title?: string;
  message?: string;
  delay?: number;
};

export function Tooltip({
  title,
  message,
  delay,
  style,
  children,
}: TooltipProps) {
  const [active, setActive] = useState(false);

  let timeout: NodeJS.Timeout;

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 200);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <View
      className="h-full w-full"
      style={style}
      onPointerEnter={showTip}
      onPointerLeave={hideTip}
    >
      {children}

      {message && active && (
        <View className="flex gap-1 absolute -top-2 left-[50%] bg-background-100 p-2 rounded-lg bg-opacity-85 translate-x-[-50%] translate-y-[-100%] z-10">
          {title && (
            <Text className="color-white font-bold whitespace-nowrap">
              {title}
            </Text>
          )}
          {message && (
            <Text className="color-white whitespace-nowrap">{message}</Text>
          )}
        </View>
      )}
    </View>
  );
}
