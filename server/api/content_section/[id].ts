import { sectionContents } from '../../database/content_section'
import { db } from '../../db'
import { eq } from 'drizzle-orm'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const id = event.context.params?.id
  if (!id) {
    return { error: 'id wajib diisi di params' }
  }

  // GET: Ambil satu konten berdasarkan id
  if (event.method === 'GET') {
    const content = await db.select().from(sectionContents).where(eq(sectionContents.id, id)).limit(1)
    return content[0] || null
  }

  // PUT: Update konten berdasarkan id
  if (event.method === 'PUT') {
    const body = await readBody(event)
    const result = await db.update(sectionContents)
      .set({
        title: body.title,
        type: body.type,
        content_url: body.content_url,
        order: body.order,
        deskripsi: body.deskripsi,
        section_id: body.section_id,
      })
      .where(eq(sectionContents.id, id))
    return { success: true, result }
  }

  // DELETE: Hapus konten berdasarkan id
  if (event.method === 'DELETE') {
    const result = await db.delete(sectionContents).where(eq(sectionContents.id, id))
    return { success: true, result }
  }

  return { error: 'Method tidak didukung' }
})
