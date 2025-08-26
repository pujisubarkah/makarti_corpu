import { db } from '../../../db';
import { courses } from '../../../database/courses';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async () => {
  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.is_published, true));

  return result;
});
