import { courses } from '@/server/database/courses'
import { courseProgress } from '@/server/database/course_progress'
import { db } from '@/server/db'
import { users } from '@/server/database/users'
import { H3Event } from 'h3'
import { eq, and } from 'drizzle-orm'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'

export default defineEventHandler(async (event: H3Event) => {
  // Only allow GET method
  if (event.method !== 'GET') {
    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  }

  // Get user from token (assume JWT in Authorization header)
  const authHeader = event.req.headers['authorization']
  if (!authHeader) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  const token = authHeader.replace('Bearer ', '')
  // TODO: verify token and get userId
  // For example purposes, assume userId is in token (decode JWT)
  const userId = decodeUserIdFromToken(token) // implement this function

  // Get course slug from query
  const courseSlug = getQuery(event).slug
  if (!courseSlug) {
    throw createError({ statusCode: 400, message: 'Course slug is required' })
  }

  // Get course_id from slug
  const courseRes = await db.select().from(courses).where(eq(courses.slug, String(courseSlug))).limit(1)
  if (!courseRes[0]) {
    throw createError({ statusCode: 404, message: 'Course not found' })
  }
  const courseId = courseRes[0].id

  // Check if user has completed the course
  const progress = await db.select().from(courseProgress)
    .where(and(eq(courseProgress.user_id, String(userId)), eq(courseProgress.course_id, String(courseId))))
    .limit(1)
  if (!progress || !progress[0] || (progress[0].progress_percent ?? 0) < 100) {
    throw createError({ statusCode: 403, message: 'Course not completed' })
  }

  // Ambil data user dan course untuk sertifikat
  const userRes = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  const userName = userRes[0]?.full_name || 'Peserta'
  const courseTitle = courseRes[0]?.title || 'Kursus'
  const date = new Date().toLocaleDateString('id-ID')

  // Path template dan output
  const templatePath = path.join(process.cwd(), 'public', 'certificate_template.png')
  const outputFile = `certificate-${userId}-${courseSlug}.png`
  const outputPath = path.join(process.cwd(), 'public', 'certificates', outputFile)

  // Generate sertifikat PNG dengan overlay SVG
  await sharp(templatePath)
    .composite([
      {
        input: Buffer.from(
          `<svg width="1200" height="900">
            <text x="600" y="400" font-size="48" font-family="Arial, sans-serif" text-anchor="middle" fill="#222">${userName}</text>
            <text x="600" y="480" font-size="32" font-family="Arial, sans-serif" text-anchor="middle" fill="#222">${courseTitle}</text>
            <text x="600" y="560" font-size="28" font-family="Arial, sans-serif" text-anchor="middle" fill="#222">${date}</text>
          </svg>`
        ),
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile(outputPath)

  // Kembalikan URL sertifikat PNG
  return {
    success: true,
    message: 'Certificate generated',
    certificateUrl: `/certificates/${outputFile}`
  }
})

// Dummy function for JWT decoding
function decodeUserIdFromToken(token: string): string {
  // Implement JWT decoding here
  // For demo, just return token
  return token
}