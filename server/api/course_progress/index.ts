import { eq, and } from 'drizzle-orm'
import { db } from '../../db'
import { courseProgress } from '../../database/course_progress'
import { readBody, getQuery, H3Event } from 'h3'

import { getMethod } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const method = getMethod(event)
  if (method === 'GET') {
    const { user_id, course_id, section_id } = getQuery(event)
    const filters = []
    if (user_id) filters.push(eq(courseProgress.user_id, String(user_id)))
    if (course_id) filters.push(eq(courseProgress.course_id, String(course_id)))
    if (section_id) filters.push(eq(courseProgress.section_id, String(section_id)))

    let queryBuilder = db.select().from(courseProgress)
    let data
    if (filters.length > 0) {
      data = await db.select().from(courseProgress).where(and(...filters))
    } else {
      data = await queryBuilder
    }
    return data
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const { user_id, course_id, section_id, progress_percent } = body

    const result = await db.insert(courseProgress).values({
      user_id,
      course_id,
      section_id,
      progress_percent,
      completed_at: progress_percent === 100 ? new Date() : null,
    })
    return { success: true, result }
  }

  return { error: 'Method not allowed' }
})