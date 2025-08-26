import { db } from '../../../db'
import { courseSections } from '../../../database/course_section'
import { H3Event, readBody } from 'h3'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event: H3Event) => {
  const courseId = event.context.params?.id

  if (!courseId) {
    return { error: 'course_id wajib diisi di URL' }
  }

  if (event.method === 'GET') {
    const sections = await db
      .select()
      .from(courseSections)
      .where(eq(courseSections.course_id, courseId))
      .orderBy(courseSections.order) // Tambahkan ini
    return sections
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    if (!body.title) {
      return { error: 'title wajib diisi' }
    }
    const inserted = await db.insert(courseSections).values({
      course_id: courseId,
      title: body.title,
      order: body.order ?? null,
    }).returning()
    return inserted[0]
  }

  // PUT untuk update section (title/order)
  if (event.method === 'PUT') {
    const body = await readBody(event)
    if (!body.id) {
      return { error: 'id section wajib diisi' }
    }
    const updated = await db.update(courseSections)
      .set({
        title: body.title,
        order: body.order,
      })
      .where(eq(courseSections.id, body.id))
      .returning()
    return updated[0]
  }

  // DELETE untuk hapus section
  if (event.method === 'DELETE') {
    const body = await readBody(event)
    if (!body.id) {
      return { error: 'id section wajib diisi' }
    }
    await db.delete(courseSections).where(eq(courseSections.id, body.id))
    return { success: true }
  }

  event.res.statusCode = 405
  return { error: 'Method not allowed' }
})