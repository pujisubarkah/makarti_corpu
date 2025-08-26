import { sectionContents } from '../../database/content_section'
import { db } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Ambil section_id dari URL param [id]
  const section_id = event.context.params?.id

  if (!section_id) {
    return { error: 'section_id wajib diisi di URL' }
  }

  // GET: Ambil semua konten untuk section_id tertentu
  const contents = await db
    .select()
    .from(sectionContents)
    .where(eq(sectionContents.section_id, section_id))
    .orderBy(sectionContents.order) // Sudah diurutkan berdasarkan order
  return contents
})