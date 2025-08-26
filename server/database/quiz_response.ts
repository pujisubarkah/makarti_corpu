import { pgTable, uuid, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';
import { users } from './users'; // Import users table
import { sectionQuizzes } from './section_quizzes'; // Import section_quiz table

export const quizResponses = pgTable('quiz_responses', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  quiz_id: uuid('quiz_id').notNull().references(() => sectionQuizzes.id),
  answer: text('answer').notNull(), // Jawaban user
  is_correct: boolean('is_correct'), // Apakah jawaban benar (null untuk likert)
  points_earned: integer('points_earned').default(0),
  created_at: timestamp('created_at').defaultNow(),
});