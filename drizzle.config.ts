
// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

function parseDatabaseUrl(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port) || 5432,
    user: parsed.username,
    password: parsed.password,
    database: parsed.pathname.slice(1), // Remove leading slash
    ssl: parsed.searchParams.get('sslmode') === 'require',
  };
}

const dbCredentials = parseDatabaseUrl(process.env.DATABASE_URL!);

export default {
  schema: './server/database/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials,
} satisfies Config;


