import { db } from '../../db'
import { topics } from '../../database/schema/index'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    const query = getQuery(event)
    if (query.id) {
      // Get topic by id
      const result = await db.select().from(topics).where(eq(topics.id, String(query.id)))
      return result[0] || null
    }
    // Get all topics
    const result = await db.select().from(topics)
    return result
  }

  if (method === 'POST') {
    const body = await readBody(event)
    // title, user_id required
    if (!body.title || !body.user_id) {
      return { error: 'title and user_id required' }
    }
    const result = await db.insert(topics).values({
      title: body.title,
      description: body.description,
      user_id: body.user_id,
      replies_count: body.replies_count ?? 0,
      last_reply_at: body.last_reply_at ?? null,
    }).returning()
    return result[0]
  }

})
