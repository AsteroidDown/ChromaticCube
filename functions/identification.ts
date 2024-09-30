export function generateId(prefix: string) {
  return prefix + "_" + Math.random().toString(36).substring(2, 15);
}
