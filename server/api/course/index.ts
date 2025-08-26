// server/api/course/index.ts
// Update the path below if your db file is located elsewhere
import { db } from '../../db';
import { courses } from '../../database/courses';
import { users } from '../../database/users';
import { eq } from 'drizzle-orm';
import { H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  if (event.method === 'GET') {
    // Join courses dengan users untuk dapatkan nama instruktur
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
        instructor_name: users.full_name,
      })
      .from(courses)
      .leftJoin(users, eq(courses.instructor_id, users.id));
    return allCourses;
  }

  if (event.method === 'POST') {
    // Create a new course
    const body = await readBody(event);
    // Validasi sederhana, tambahkan validasi sesuai kebutuhan
    if (!body.title || !body.slug || !body.instructor_id) {
      return { error: 'title, slug, and instructor_id are required' };
    }
    const inserted = await db.insert(courses).values({
      title: body.title,
      slug: body.slug,
      description: body.description,
      thumbnail_url: body.thumbnail_url,
      instructor_id: body.instructor_id,
      is_published: body.is_published ?? false,
    }).returning();
    return inserted[0];
  }

  // Method not allowed
  event.res.statusCode = 405;
  return { error: 'Method not allowed' };
});