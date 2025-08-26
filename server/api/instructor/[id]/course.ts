import { db } from '../../../db';
import { courses } from '../../../database/courses';
import { eq } from 'drizzle-orm';
import { H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const instructorId = event.context.params?.id;

  if (!instructorId) {
    return { error: 'instructor_id is required in the URL' };
  }

  if (event.method === 'GET') {
    const result = await db
      .select()
      .from(courses)
      .where(eq(courses.instructor_id, instructorId));
    return result;
  }

  if (event.method === 'POST') {
    const body = await readBody(event);
    if (!body.title || !body.slug) {
      return { error: 'title dan slug wajib diisi' };
    }
    const inserted = await db.insert(courses).values({
      title: body.title,
      slug: body.slug,
      description: body.description ?? '',
      thumbnail_url: body.thumbnail_url ?? '',
      instructor_id: instructorId,
      is_published: body.is_published ?? false,
    }).returning();
    return inserted[0];
  }

  event.res.statusCode = 405;
  return { error: 'Method not allowed' };
});
