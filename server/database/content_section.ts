import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
// Update the import path if the file is located elsewhere, for example:
import { courseSections } from './course_section';
// Or, if the file is named differently, update accordingly:
// import { courseSections } from './courseSections';

export const sectionContents = pgTable('section_contents', {
  id: uuid('id').primaryKey().defaultRandom(),
  section_id: uuid('section_id').notNull().references(() => courseSections.id),
  type: text('type').notNull(), // 'video', 'pdf', 'paparan', 'embed', etc.
  title: text('title').notNull(),
  content_url: text('content_url').notNull(), // link ke video/pdf/slide/paparan
  order: integer('order'),
  created_at: timestamp('created_at').defaultNow(),
  deskripsi: text('deskripsi'), // Tambahkan kolom deskripsi
});