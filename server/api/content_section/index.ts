
import { sectionContents } from '../../database/content_section'
import { db } from '../../db'
import { eq } from 'drizzle-orm'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  // POST: Tambah konten baru ke section
  if (event.method === 'POST') {
    const body = await readBody(event)
    // Validasi minimal: pastikan ada section_id, title, type, content_url
    if (!body.section_id || !body.title || !body.type || !body.content_url) {
      return { error: 'section_id, title, type, dan content_url wajib diisi' }
    }
    const result = await db.insert(sectionContents).values({
      section_id: body.section_id,
      title: body.title,
      type: body.type,
      content_url: body.content_url,
      order: body.order || 0,
      deskripsi: body.deskripsi || '',
    })
    return { success: true, result }
  }

  // GET: Ambil semua konten section (bisa filter dengan section_id)
  const section_id = event.context.params?.section_id || event.context.query?.section_id
  if (section_id) {
    const contents = await db
      .select()
      .from(sectionContents)
      .where(eq(sectionContents.section_id, section_id))
      .orderBy(sectionContents.order)
    return contents
  }
  // Jika tidak ada section_id, ambil semua
  const contents = await db.select().from(sectionContents)
  return contents
})