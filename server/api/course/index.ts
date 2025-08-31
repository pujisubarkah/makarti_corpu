// server/api/course/index.ts
// Update the path below if your db file is located elsewhere
import { db } from '../../db';
import { courses, users } from '~/server/database/schema';
import { eq } from 'drizzle-orm';
import { H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event);

  if (event.method === 'GET') {
    const allCourses = await db
      .select({
        id: courses.id,
        title: courses.title,
        slug: courses.slug,
        description: courses.description,
        thumbnail_url: courses.thumbnail_url,
        instructor_id: courses.instructor_id,
        created_at: courses.created_at,
        is_published: courses.is_published,
        competency_id: courses.competency_id,
        instructor_name: users.full_name,
      })
      .from(courses)
      .leftJoin(users, eq(courses.instructor_id, users.id));

    if (query.competensi_id) {
      return allCourses.filter(c => c.competency_id === Number(query.competensi_id));
    }
    return allCourses;
  }

  if (event.method === 'POST') {
    // Create a new course
    const body = await readBody(event);
    // Validasi sederhana, tambahkan validasi sesuai kebutuhan
    if (!body.title || !body.slug || !body.instructor_id || !body.competency_id) {
      return { error: 'title, slug, instructor_id, and competency_id are required' };
    }
    const inserted = await db.insert(courses).values({
      title: body.title,
      slug: body.slug,
      description: body.description,
      thumbnail_url: body.thumbnail_url,
      instructor_id: body.instructor_id,
      is_published: body.is_published ?? false,
      competency_id: Number(body.competency_id),
    }).returning();
    return inserted[0];
  }

  if (event.method === 'DELETE') {
  // Delete course by id (from query or body)
  const id = query.id || (await readBody(event)).id;
  if (!id) return { error: 'Course id required' };
  await db.delete(courses).where(eq(courses.id, String(id)));
  return { success: true };
  }

  if (event.method === 'PUT') {
  // Update course by id
  const body = await readBody(event);
  if (!body.id) return { error: 'Course id required' };
  const updateData = { ...body };
  delete updateData.id;
  await db.update(courses).set(updateData).where(eq(courses.id, String(body.id)));
  return { success: true };
  }

  // Method not allowed
  event.res.statusCode = 405;
  return { error: 'Method not allowed' };
});