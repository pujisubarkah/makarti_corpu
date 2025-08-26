import { db } from '../../../db'
import { courses } from '../../../database/courses'
import { users } from '../../../database/users'
import { eq, and } from 'drizzle-orm'
import { H3Event, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  // Get course ID from URL parameter
  const courseId = event.context.params?.id

  if (!courseId) {
    throw createError({
      statusCode: 400,
      message: 'Course ID is required'
    })
  }

  if (event.method === 'GET') {
    try {
      // Join courses with users to get instructor details
      const course = await db
        .select({
          id: courses.id,
          title: courses.title,
          slug: courses.slug,
          description: courses.description,
          thumbnail_url: courses.thumbnail_url,
          instructor_id: courses.instructor_id,
          created_at: courses.created_at,
          is_published: courses.is_published,
          instructor_name: users.full_name,
        })
        .from(courses)
        .leftJoin(users, eq(courses.instructor_id, users.id))
        .where(eq(courses.id, courseId))
        .limit(1)

      if (!course.length) {
        throw createError({
          statusCode: 404,
          message: 'Course not found'
        })
      }

      return { course: course[0] }
    } catch (error) {
      console.error('Error fetching course:', error)
      if (error instanceof Error) {
        throw createError({
          statusCode: 500,
          message: error.message || 'Failed to fetch course'
        })
      } else if (typeof error === 'object' && error !== null && 'statusCode' in error && 'message' in error) {
        throw createError({
          statusCode: (error as any).statusCode || 500,
          message: (error as any).message || 'Failed to fetch course'
        })
      } else {
        throw createError({
          statusCode: 500,
          message: 'Failed to fetch course'
        })
      }
    }
  } else if (event.method === 'PATCH') {
    const body = await readBody(event)

    // Update the is_published field for the specific course
    await db.update(courses)
      .set({ is_published: body.is_published })
      .where(eq(courses.id, courseId))

    return { success: true }
  }

  // Handle unsupported methods
  throw createError({
    statusCode: 405,
    message: 'Method not allowed'
  })
})