// /server/api/instructor/dashboard.get.ts
import { db } from '~/server/db'
import { courses, enrollments, sectionContents, users } from '~/server/database/schema'
import { and, eq, inArray } from 'drizzle-orm'
import { defineEventHandler, getHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const userId = event.context.auth?.user?.id // ambil dari auth middleware
  if (!userId) {
    return { success: false, message: 'Unauthorized' }
  }

  // 1. Total kursus yang dia ajar
  const kursus = await db
    .select({ id: courses.id })
    .from(courses)
    .where(eq(courses.instructor_id, userId))

  const courseIds = kursus.map((c) => c.id)

  // 2. Total peserta
  const peserta = await db
    .select({ count: enrollments.id })
    .from(enrollments)
    .where(inArray(enrollments.course_id, courseIds))

  // 3. Total konten
  const konten = await db
    .select({ count: sectionContents.id })
    .from(sectionContents)
    .where(inArray(sectionContents.section_id, courseIds))

  return {
    success: true,
    stats: {
      totalCourses: courseIds.length,
      totalStudents: Number(peserta[0]?.count || 0),
      totalContent: Number(konten[0]?.count || 0),
    },
  }
})
