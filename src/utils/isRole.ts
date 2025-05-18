import type { JsonValue } from 'type-fest';

export function isRoles(role: string | JsonValue | undefined, endpoint: string): boolean {
  if (role === role) {
    return true;
  } else return false;
}
