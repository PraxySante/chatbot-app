import * as crypto from 'crypto';
export function generateUuidSession(): string {
	return crypto.randomUUID();
}
