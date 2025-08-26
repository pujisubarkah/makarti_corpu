// server/database/section_videos.ts

import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { courseSections } from './course_section';

export const sectionVideos = pgTable('section_videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  section_id: uuid('section_id').notNull().references(() => courseSections.id),
  title: text('title').notNull(),
  video_url: text('video_url').notNull(), // URL YouTube, Mux, dll.
  duration_seconds: integer('duration_seconds'), // durasi video dalam detik
  order: integer('order'), // urutan video dalam section
  description: text('description'), // opsional: deskripsi video
  created_at: timestamp('created_at').defaultNow(),
});
