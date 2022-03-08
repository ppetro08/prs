import { authenticationPath } from '../../app-routing.module';

export function isAuthenticationRoute(url: string): boolean {
  const authenticationUrl = authenticationPath.toUpperCase();
  return url.toUpperCase().includes(authenticationUrl);
}
