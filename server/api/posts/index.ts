import { db } from '../../db'
import { posts } from '../../database/schema/index'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
	const method = event.method

	if (method === 'GET') {
		const query = getQuery(event)
		if (query.id) {
			// Get post by id
			const result = await db.select().from(posts).where(eq(posts.id, String(query.id)))
			return result[0] || null
		}
		// Get all posts
		const result = await db.select().from(posts)
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

	if (method === 'DELETE') {
		const query = getQuery(event)
		if (!query.id) return { error: 'id required' }
		await db.delete(posts).where(eq(posts.id, String(query.id)))
		return { success: true }
	}
})
