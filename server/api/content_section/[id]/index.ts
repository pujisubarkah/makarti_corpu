import { sectionContents } from '../../../database/schema'
import { db } from '../../../db'
import { eq } from 'drizzle-orm'


import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const section_id = event.context.params?.id
  if (!section_id) {
    return { error: 'section_id wajib diisi di URL' }
  }

  if (event.method === 'GET') {
    // GET: Ambil semua konten untuk section_id tertentu
    const contents = await db
      .select()
      .from(sectionContents)
      .where(eq(sectionContents.section_id, section_id))
      .orderBy(sectionContents.order)
    return contents
  }

  if (event.method === 'DELETE') {
    // DELETE: Hapus semua konten section dengan section_id tertentu
    const result = await db.delete(sectionContents).where(eq(sectionContents.section_id, section_id))
    return { success: true, deleted: result }
  }

  if (event.method === 'PUT') {
    // PUT: Update konten section berdasarkan section_id
    const body = await readBody(event)
    // body harus berisi field yang ingin diupdate, misal: title, content_url, order, dsb
    const result = await db.update(sectionContents)
      .set(body)
      .where(eq(sectionContents.section_id, section_id))
    return { success: true, updated: result }
  }

  return { error: 'Method not allowed' }
})