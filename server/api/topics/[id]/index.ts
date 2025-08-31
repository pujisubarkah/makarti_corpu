import { db } from '../../../db'
import { topics } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = event.context.params?.id

  if (method === 'GET') {
    if (!id) return { error: 'id required' }
    const result = await db.select().from(topics).where(eq(topics.id, String(id)))
    return result[0] || null
  }

  if (method === 'DELETE') {
    if (!id) return { error: 'id required' }
    await db.delete(topics).where(eq(topics.id, String(id)))
    return { success: true }
  }
})
