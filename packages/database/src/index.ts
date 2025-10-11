import { DocumentSchema } from '@repo/shared';

export function test() {
  console.log('Database package loaded');
  console.log('DocumentSchema available:', DocumentSchema);
}

export { DocumentSchema };