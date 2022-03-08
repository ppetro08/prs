export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function stringEqualCaseInsensitive(
  str1: string,
  str2: string
): boolean {
  return str1.toLocaleUpperCase() == str2.toLocaleUpperCase();
}
