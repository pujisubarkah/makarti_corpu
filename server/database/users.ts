import { pgTable, uuid, text, timestamp, integer, boolean, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  full_name: text('full_name').notNull(),
  role: text('role').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  role_id: integer('role_id').notNull(),
  nip: varchar('nip', { length: 64 }),
  is_active: boolean('is_active').default(true).notNull(),
  avatar_seed: text('avatar_seed')
})