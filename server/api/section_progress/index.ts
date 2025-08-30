import { db } from '../../db'
import { sectionProgress } from '../../database/section_progress'
import { readBody } from 'h3'
import { eq, and } from 'drizzle-orm'

// GET: Ambil semua progress section
import type { H3Event } from 'h3'

import { getMethod } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const method = getMethod(event)
  if (method === 'GET') {
    const data = await db.select().from(sectionProgress)
    return { progress: data }
  }

  // POST: Tambah atau update progress section
  if (method === 'POST') {
    const body = await readBody(event)
    const { user_id, section_id, progress_percent, is_completed } = body

    if (!user_id || !section_id) {
      return { error: 'user_id dan section_id wajib diisi' }
    }

    // Update jika sudah ada, insert jika belum
    const [existing] = await db
      .select()
      .from(sectionProgress)
      .where(
        and(
          eq(sectionProgress.user_id, user_id),
          eq(sectionProgress.section_id, section_id)
        )
      )
      .limit(1)

    let result
    if (existing) {
      result = await db
        .update(sectionProgress)
        .set({
          progress_percent,
          is_completed,
          completed_at: is_completed ? new Date() : null
        })
        .where(eq(sectionProgress.id, existing.id))
        .returning()
    } else {
      result = await db
        .insert(sectionProgress)
        .values({
          user_id,
          section_id,
          progress_percent,
          is_completed,
          completed_at: is_completed ? new Date() : null
        })
        .returning()
    }

    return { success: true, progress: result[0] }
  }

  return { error: 'Method not allowed' }
})