export function compactFilterParams<T extends Record<string, string | undefined>>(
  params: T,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(params).filter((entry): entry is [string, string] => Boolean(entry[1])),
  ) as Partial<T>;
}
