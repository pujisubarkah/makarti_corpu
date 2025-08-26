import { db } from '../../db'
import { courseSections } from '../../database/course_section'
import { sectionContents } from '../../database/content_section'
import { readBody } from 'h3'
import { eq } from 'drizzle-orm'

// GET: Ambil semua section beserta kontennya
export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const sections = await db
      .select()
      .from(courseSections)
      .orderBy(courseSections.order) // Urutkan berdasarkan order
    // Ambil semua konten
    const contents = await db.select().from(sectionContents)
    // Gabungkan konten ke masing-masing section
    const sectionsWithContents = sections.map((section: typeof sections[number]) => ({
      ...section,
      contents: contents.filter(content => content.section_id === section.id)
    }))
    return { sections: sectionsWithContents }
  }

  // POST: Tambah section baru
  if (event.method === 'POST') {
    const body = await readBody(event)
    const { course_id, title, order } = body

    if (!course_id || !title) {
      return { error: 'course_id dan title wajib diisi' }
    }

    const [newSection] = await db
      .insert(courseSections)
      .values({ course_id, title, order })
      .returning()

    return { success: true, section: newSection }
  }

  return { error: 'Method not allowed' }
})