// Update the path below if your db file is located elsewhere
import { db } from '../../../db';
import { course_info } from '../../../database/course_info'
import { courses } from '../../../database/courses'
import { eq } from 'drizzle-orm'
import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  // Get course_id from URL parameter
  const courseId = event.context.params?.id

  if (!courseId) {
    throw createError({
      statusCode: 400,
      message: 'Course ID is required'
    })
  }

  // GET: Fetch course info
  if (event.method === 'GET') {
    try {
      const info = await db
        .select()
        .from(course_info)
        .where(eq(course_info.course_id, courseId))
        .limit(1)

      if (!info.length) {
        throw createError({
          statusCode: 404,
          message: 'Course info not found'
        })
      }

      return { course_info: info[0] }
    } catch (error) {
      console.error('Error fetching course info:', error)
      throw createError({
        statusCode: typeof error === 'object' && error !== null && 'statusCode' in error ? (error as any).statusCode : 500,
        message: typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : 'Failed to fetch course info'
      })
    }
  }

  // POST: Update course info
  if (event.method === 'POST') {
    try {
      const body = await readBody(event)

      // Validate required fields
      const requiredFields = ['level', 'duration', 'language', 'mode']
      for (const field of requiredFields) {
        if (!body[field]) {
          throw createError({
            statusCode: 400,
            message: `${field} is required`
          })
        }
      }

      // Check if course exists
      const courseExists = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId))
        .limit(1)

      if (!courseExists.length) {
        throw createError({
          statusCode: 404,
          message: 'Course not found'
        })
      }

      // Upsert course info
      const [result] = await db
        .insert(course_info)
        .values({
          course_id: courseId,
          level: body.level,
          duration: body.duration,
          language: body.language,
          mode: body.mode,
          certificate: body.certificate ?? false,
          mobile_friendly: body.mobile_friendly ?? true
        })
        .onConflictDoUpdate({
          target: course_info.course_id,
          set: {
            level: body.level,
            duration: body.duration,
            language: body.language,
            mode: body.mode,
            certificate: body.certificate ?? false,
            mobile_friendly: body.mobile_friendly ?? true,
            updated_at: new Date()
          }
        })
        .returning()

      return {
        success: true,
        course_info: result
      }
    } catch (error) {
      console.error('Error saving course info:', error)
      throw createError({
        statusCode: typeof error === 'object' && error !== null && 'statusCode' in error ? (error as any).statusCode : 500,
        message: typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : 'Failed to save course info'
      })
    }
  }

  // Handle unsupported methods
  throw createError({
    statusCode: 405,
    message: 'Method not allowed'
  })
})