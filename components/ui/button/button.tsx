import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pressable, Text, View, ViewProps } from "react-native";

export type ButtonProps = ViewProps & {
  text?: string;
  disabled?: boolean;
  icon?: IconProp;
  action?: () => void;
};

export default function Button({
  text,
  icon,
  action,
  children,
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable onPress={action} disabled={disabled}>
      <View
        className={
          "flex flex-row px-4 py-2 gap-2 justify-center items-center w-full h-10 rounded-md transition-all duration-300 " +
          (disabled ? "bg-dark-300" : "bg-primary-500 hover:bg-primary-400")
        }
      >
        {icon && <FontAwesomeIcon icon={icon} />}

        {text && (
          <Text
            className={
              "text-md font-bold " +
              (disabled ? "text-dark-100" : "text-dark-600")
            }
          >
            {text}
          </Text>
        )}

        {children}
      </View>
    </Pressable>
  );
}
