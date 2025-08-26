import { sectionQuizzes } from '../../database/section_quizzes'
import { db } from '../../db'
import { H3Event, readBody } from 'h3'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event: H3Event) => {
  // GET: Ambil semua quiz section (bisa filter dengan section_id)
  if (event.method === 'GET') {
    const section_id = event.context.query?.section_id
    if (section_id) {
      const quizzes = await db
        .select()
        .from(sectionQuizzes)
        .where(eq(sectionQuizzes.section_id, section_id))
        .orderBy(sectionQuizzes.order)
      return { quizzes }
    }
    // Jika tidak ada section_id, ambil semua
    const quizzes = await db.select().from(sectionQuizzes)
    return { quizzes }
  }

  // POST: Tambah quiz baru
  if (event.method === 'POST') {
    const body = await readBody(event)
    if (!body.section_id || !body.question || !body.type) {
      return { error: 'section_id, question, dan type wajib diisi' }
    }
    const inserted = await db.insert(sectionQuizzes).values({
      section_id: body.section_id,
      type: body.type,
      question: body.question,
      choices: body.choices ?? null,
      correct_answer: body.correct_answer ?? null,
      order: body.order ?? null,
      points: body.points ?? 1,
      is_required: body.is_required ?? true,
    }).returning()
    return { success: true, quiz: inserted[0] }
  }

  // PUT: Edit quiz
  if (event.method === 'PUT') {
    const body = await readBody(event)
    if (!body.id) {
      return { error: 'id quiz wajib diisi' }
    }
    const updated = await db.update(sectionQuizzes)
      .set({
        type: body.type,
        question: body.question,
        choices: body.choices,
        correct_answer: body.correct_answer,
        order: body.order,
        points: body.points,
        is_required: body.is_required,
      })
      .where(eq(sectionQuizzes.id, body.id))
      .returning()
    return { success: true, quiz: updated[0] }
  }

  // DELETE: Hapus quiz
  if (event.method === 'DELETE') {
    const body = await readBody(event)
    if (!body.id) {
      return { error: 'id quiz wajib diisi' }
    }
    await db.delete(sectionQuizzes).where(eq(sectionQuizzes.id, body.id))
    return { success: true }
  }

  event.res.statusCode = 405
  return { error: 'Method not allowed' }
})