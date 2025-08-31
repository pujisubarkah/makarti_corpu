// server/api/topics/[id]/posts.get.ts
import { db } from '../../../db'
import { posts, users } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = event.context.params?.id

  if (method === 'GET') {
    if (!id) return { error: 'id required' }
    const result = await db
      .select({
        id: posts.id,
        content: posts.content,
        created_at: posts.created_at,
        user_id: posts.user_id,
        full_name: users.full_name,
        avatar_seed: users.avatar_seed
      })
      .from(posts)
      .leftJoin(users, eq(posts.user_id, users.id))
      .where(eq(posts.topic_id, String(id)))
    return result
  }

  if (method === 'POST') {
    const body = await readBody(event)
    // topic_id, user_id, content required
    if (!body.topic_id || !body.user_id || !body.content) {
      return { error: 'topic_id, user_id, and content required' }
    }
    const result = await db.insert(posts).values({
      topic_id: body.topic_id,
      user_id: body.user_id,
      content: body.content,
    }).returning()
    return result[0]
  }
})

