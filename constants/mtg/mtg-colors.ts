export enum MTGColor {
  LAND = "land",
  WHITE = "white",
  BLUE = "blue",
  BLACK = "black",
  RED = "red",
  GREEN = "green",
  GOLD = "gold",
  COLORLESS = "colorless",
  MONO = "mono"
}

export type MTGColorSymbol = "W" | "U" | "B" | "R" | "G" | "M" | "C" | "1";

export const MTGColorMap = new Map<MTGColor, MTGColorSymbol>([
  [MTGColor.WHITE, "W"],
  [MTGColor.BLUE, "U"],
  [MTGColor.BLACK, "B"],
  [MTGColor.RED, "R"],
  [MTGColor.GREEN, "G"],
  [MTGColor.GOLD, "M"],
  [MTGColor.COLORLESS, "C"],
  [MTGColor.MONO, "1"],
]);
