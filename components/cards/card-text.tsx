import Text from "@/components/ui/text/text";
import { SymbolMap } from "@/constants/mtg/mtg-symbols";
import { Image, View } from "react-native";

export interface CardTextProps {
  text: string;
}

export default function CardText({ text }: CardTextProps) {
  const lines = text.split("\n").map((line) => {
    let add = true;
    let value: string | undefined = undefined;

    if (line[0] === "+" || line[0] === "−") {
      add = line[0] === "+";
      value = line.split(":")?.[0]?.substring(1);
      line = line.substring(line.indexOf(":") + 1);
    }

    const foundSymbols = line.split("{");

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

    return { add, value, sections };
  });

  return (
    <View className="flex flex-row flex-wrap gap-2 items-center">
      {lines.map((line, index) => (
        <Text className="items-center" key={index}>
          {line.value && (
            <Text
              thickness="bold"
              className="px-2 py-0.5 bg-background-100 rounded"
            >
              {line.add ? "+" : "-"} {line.value}
            </Text>
          )}

          {line.sections.map((section, index) => (
            <Text key={section + index}>
              {section[0] === "{" && (
                <Image
                  className="h-4 w-4 -mb-[3px] mx-px"
                  source={{ uri: SymbolMap.get(section) }}
                />
              )}

              {section[0] !== "{" && <Text>{section}</Text>}
            </Text>
          ))}
        </Text>
      ))}
    </View>
  );
}
