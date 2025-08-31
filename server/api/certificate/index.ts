import { db } from '../../db';
import { certificates } from '../../database/schema/certificates'
import { eq, and } from 'drizzle-orm'

import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  if (event.method === 'POST') {
    // Generate certificate for user & course
    const body = await readBody(event)
    const { user_id, course_id, url } = body
    if (!user_id || !course_id || !url) {
      return { error: 'user_id, course_id, and url required' }
    }
    // Insert certificate
    const cert = await db.insert(certificates).values({
      user_id,
      course_id,
      url,
    }).returning()
    return cert[0]
  }

  if (event.method === 'GET') {
    // Get certificate for user & course
    const { user_id, course_id } = getQuery(event)
    if (!user_id || !course_id) {
      return { error: 'user_id and course_id required' }
    }
    const cert = await db.select().from(certificates)
      .where(
        and(
          eq(certificates.user_id, Number(user_id)),
          eq(certificates.course_id, Number(course_id))
        )
      )
    return cert[0] || null
  }
})
