import { sectionQuizzes } from '../../../database/section_quizzes'
import { db } from '../../../db'
import { H3Event, readBody } from 'h3'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event: H3Event) => {
  const section_id = event.context.params?.id

  // GET: Ambil semua quiz berdasarkan section_id
  if (event.method === 'GET') {
    if (!section_id) {
      return { error: 'section_id tidak ditemukan di URL' }
    }

    const quizzes = await db
      .select()
      .from(sectionQuizzes)
      .where(eq(sectionQuizzes.section_id, section_id))
      .orderBy(sectionQuizzes.order)

    return { quizzes }
  }

  // POST: Tambah quiz ke section tertentu
  if (event.method === 'POST') {
    const body = await readBody(event)

    if (!body.question || !body.type) {
      return { error: 'question dan type wajib diisi' }
    }

    if (!section_id || typeof section_id !== 'string') {
      return { error: 'section_id tidak ditemukan di URL' }
    }

    const inserted = await db.insert(sectionQuizzes).values({
      section_id: section_id,
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

    // DELETE: Hapus quiz berdasarkan quiz_id (id dari URL)
    if (event.method === 'DELETE') {
      // section_id di sini bisa dianggap sebagai quiz_id
      if (!section_id) {
        return { error: 'quiz_id tidak ditemukan di URL' }
      }
      try {
        const deleted = await db.delete(sectionQuizzes).where(eq(sectionQuizzes.id, section_id))
        return { success: true, deleted }
      } catch (err) {
        if (err instanceof Error) {
          console.error('Gagal menghapus quiz:', err.stack || err)
        } else {
          console.error('Gagal menghapus quiz:', err)
        }
        const errorMessage = (err instanceof Error) ? err.message : String(err);
        return { error: 'Gagal menghapus quiz', detail: errorMessage }
      }
    }

  // PUT: Edit quiz berdasarkan quiz_id (id dari URL)
  if (event.method === 'PUT') {
    if (!section_id) {
      return { error: 'quiz_id tidak ditemukan di URL' }
    }
    const body = await readBody(event)
    const updated = await db.update(sectionQuizzes)
      .set(body)
      .where(eq(sectionQuizzes.id, section_id))
    return { success: true, updated }
  }

  event.res.statusCode = 405
  return { error: 'Method not allowed untuk endpoint ini' }
})
