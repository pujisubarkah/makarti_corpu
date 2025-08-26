import { pgTable, uuid, text, integer, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';
import { courseSections } from './course_section';

export const sectionQuizzes = pgTable('section_quizzes', {
  id: uuid('id').primaryKey().defaultRandom(),
  section_id: uuid('section_id').notNull().references(() => courseSections.id),
  type: text('type').notNull(), // 'multiple', 'short', 'truefalse', 'fill', 'likert'
  question: text('question').notNull(), // Pertanyaan quiz
  choices: jsonb('choices'), // Array pilihan untuk multiple choice: ["A", "B", "C", "D"]
  correct_answer: text('correct_answer'), // Jawaban benar (index untuk multiple, text untuk lainnya)
  order: integer('order'), // Urutan quiz dalam section
  points: integer('points').default(1), // Point/nilai quiz
  is_required: boolean('is_required').default(true), // Wajib dijawab atau tidak
  created_at: timestamp('created_at').defaultNow(),
});