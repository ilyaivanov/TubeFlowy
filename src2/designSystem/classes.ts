type valueof<T> = T[keyof T];
export type ClassName = valueof<typeof cls>;

export const cls = {
  title: "title",
} as const;