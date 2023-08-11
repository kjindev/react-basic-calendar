export type ItemType = number | null;

export type ListType = ItemType[][];

export interface OptionType {
  container: Record<string, string>;
  title: Record<string, string>;
  dates: Record<string, string>;
}
