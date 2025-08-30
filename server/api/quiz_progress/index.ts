import { eq, and } from 'drizzle-orm'
import { db } from '../../db'
import { quizResponses } from '../../database/quiz_response' // Sesuaikan dengan nama file yang benar
import { readBody, getQuery } from 'h3'

import type { H3Event } from 'h3'

import { getMethod } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const method = getMethod(event)
  if (method === 'GET') {
    const { user_id, quiz_id } = getQuery(event)
    const filters = []
    if (user_id) filters.push(eq(quizResponses.user_id, String(user_id)))
    if (quiz_id) filters.push(eq(quizResponses.quiz_id, String(quiz_id)))

    const data = await (
      filters.length > 0
        ? db.select().from(quizResponses).where(and(...filters))
        : db.select().from(quizResponses)
    )
    return { responses: data }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const { user_id, quiz_id, answer, is_correct, points_earned } = body

    if (!user_id || !quiz_id || !answer) {
      return { error: 'user_id, quiz_id, dan answer wajib diisi' }
    }

    const result = await db.insert(quizResponses).values({
      user_id,
      quiz_id,
      answer,
      is_correct: is_correct ?? null,
      points_earned: points_earned ?? 0,
    }).returning()

    return { success: true, response: result[0] }
  }

  return { error: 'Method not allowed' }
})