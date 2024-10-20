export function titleCase(text?: string) {
  return text?.length
    ? text
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(" ")
    : "";
}

export function currency(value: number) {
  return "$" + value.toFixed(2);
}
