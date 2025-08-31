import { db } from '../../db'
import { courseSections } from '../../database/course_section'
import { sectionContents } from '../../database/content_section'
import { readBody, H3Event } from 'h3'
import { eq, inArray } from 'drizzle-orm'

export default defineEventHandler(async (event: H3Event) => {
  const id = event.context.params?.id

  // DELETE: Hapus semua section dan konten berdasarkan course_id (khusus jika body ada course_id)
  if (event.method === 'DELETE') {
    try {
      const body = await readBody(event)
      if (body && body.course_id) {
        // Cari semua section id
        const sections = await db.select().from(courseSections).where(eq(courseSections.course_id, body.course_id))
        const sectionIds = sections.map(s => s.id)
        // Hapus semua konten yang terkait
        if (sectionIds.length) {
          await db.delete(sectionContents).where(inArray(sectionContents.section_id, sectionIds))
          await db.delete(courseSections).where(eq(courseSections.course_id, body.course_id))
        }
        return { success: true }
      }

      // DELETE by id
      if (!id) {
        return { error: 'id section wajib diisi di URL' }
      }
  // Hapus semua progress yang terkait dengan section
  // Import sectionProgress dari database/section_progress
  const { sectionProgress } = await import('../../database/section_progress')
  await db.delete(sectionProgress).where(eq(sectionProgress.section_id, id))
  // Hapus semua konten yang terkait dengan section
  await db.delete(sectionContents).where(eq(sectionContents.section_id, id))
  // Hapus section
  const result = await db.delete(courseSections).where(eq(courseSections.id, id))
  return { success: true, result }
    } catch (err: any) {
      // Logging error detail
      console.error('Error saat DELETE section:', err)
      return { error: 'Gagal menghapus section', detail: err?.message || err, stack: err?.stack }
    }
  }

  // GET: Ambil satu section beserta kontennya
  if (event.method === 'GET') {
    try {
      if (!id) return { error: 'id section wajib diisi di URL' }
      const section = await db.select().from(courseSections).where(eq(courseSections.id, id)).limit(1)
      if (!section.length) return { error: 'Section tidak ditemukan' }
      const contents = await db.select().from(sectionContents).where(eq(sectionContents.section_id, id))
      return { section: { ...section[0], contents } }
    } catch (err: any) {
      console.error('Error saat GET section:', err)
      return { error: 'Gagal mengambil section', detail: err?.message || err, stack: err?.stack }
    }
  }

  return { error: 'Method not allowed' }
})
