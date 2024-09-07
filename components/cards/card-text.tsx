import { Image, Text, View } from "react-native";
import { SymbolMap } from "../../constants/symbols";

export interface CardTextProps {
  text: string;
}

export default function CardText({ text }: CardTextProps) {
  text = text.replaceAll("\n", "\n\n");

  const foundSymbols = text.split("{");
  const sections = foundSymbols.reduce((acc, section) => {
    if (!section) return acc;

    const symbolEnd = section.indexOf("}");
    const symbol =
      symbolEnd > 0 ? "{" + section.substring(0, symbolEnd + 1) : null;
    const content = section.substring(symbolEnd + 1);

    if (symbol) acc.push(symbol);
    acc.push(content);

    return acc;
  }, [] as string[]);

  return (
    <View className="flex flex-row flex-wrap gap-[2px] items-center">
      <Text className="items-center">
        {sections.map((section, index) => (
          <Text key={section + index}>
            {section[0] === "{" && (
              <Image
                className="h-4 w-4 -mb-[3px] mx-px"
                source={{ uri: SymbolMap.get(section) }}
              />
            )}

            {section[0] !== "{" && (
              <Text className="color-white">{section}</Text>
            )}
          </Text>
        ))}
      </Text>
    </View>
  );
}
