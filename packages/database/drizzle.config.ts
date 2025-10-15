import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/schema/index.ts',
  out: './src/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: ['app'],
  verbose: true,
  strict: true,
} satisfies Config;