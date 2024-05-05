import { v4 as uuidv4 } from 'uuid';

// Generate a UUID and remove hyphens
export function getUuid() {
  return uuidv4().replace(/-/g, '').trim();
}
