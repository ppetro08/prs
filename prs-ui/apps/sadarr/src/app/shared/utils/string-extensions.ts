import { authenticationPath } from '../../app-routing.module';
// TODO - Create string extension

export function isAuthenticationRoute(url: string): boolean {
  const authenticationUrl = authenticationPath.toUpperCase();
  return url.toUpperCase().includes(authenticationUrl);
}

export function equalCaseInsensitive(str1: string, str2: string): boolean {
  return str1.toLocaleUpperCase() == str2.toLocaleUpperCase();
}

export function containsCaseInsensitive(str1: string, str2: string): boolean {
  return str1.toLocaleUpperCase().includes(str2.toLocaleUpperCase());
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
