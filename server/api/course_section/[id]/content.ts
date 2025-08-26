import { sectionContents } from '../../../database/content_section'
import { db } from '../../../db'
import { H3Event, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const section_id = event.context.params?.id

  if (!section_id) {
    return { error: 'section_id wajib diisi di URL' }
  }

  // POST: Tambah konten ke section tertentu
  if (event.method === 'POST') {
    const body = await readBody(event)
    if (!body.title || !body.type || !body.content_url) {
      return { error: 'title, type, dan content_url wajib diisi' }
    }
    const inserted = await db.insert(sectionContents).values({
      section_id,
      type: body.type,
      title: body.title,
      content_url: body.content_url,
      order: body.order ?? null,
      deskripsi: body.deskripsi ?? null,
    }).returning()
    return inserted[0]
  }

  event.res.statusCode = 405
  return { error: 'Method not allowed' }
})