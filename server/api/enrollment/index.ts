import { db } from '../../db'
import { enrollments } from '../../database/enrollment'
import { courses } from '../../database/courses'
import { eq, and } from 'drizzle-orm'
import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  // Get authenticated user from context
  const user = event.context.user
  if (!user || !user.id) {
    throw createError({
      statusCode: 401,
      message: 'Please login first'
    })
  }

  // GET: Fetch enrollments for current user
  if (event.method === 'GET') {
    try {
      const userEnrollments = await db
        .select({
          enrollment_id: enrollments.id,
          enrolled_at: enrollments.enrolled_at,
          course_id: courses.id,
          course_title: courses.title,
          course_slug: courses.slug,
          course_description: courses.description,
          thumbnail_url: courses.thumbnail_url
        })
        .from(enrollments)
        .leftJoin(courses, eq(enrollments.course_id, courses.id))
        .where(eq(enrollments.user_id, user.id))
        .orderBy(enrollments.enrolled_at)

      // Ambil progress untuk semua course user
      const { courseProgress } = await import('../../database/schema/index.js')
      const progressArr = await db
        .select()
        .from(courseProgress)
        .where(eq(courseProgress.user_id, user.id))

      // Gabungkan progress ke enrollments
      const enrollmentsWithProgress = userEnrollments.map(enroll => {
        const found = progressArr.find(p => p.course_id === enroll.course_id)
        return {
          ...enroll,
          progress_percent: found ? found.progress_percent : 0,
          completed_at: found ? found.completed_at : null
        }
      })

      return {
        success: true,
        enrollments: enrollmentsWithProgress || []
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch enrollments'
      })
    }
  }

  // POST: Create new enrollment
  if (event.method === 'POST') {
    try {
      const body = await readBody(event)

      if (!body.course_id) {
        throw createError({
          statusCode: 400,
          message: 'Course ID is required'
        })
      }

      // Check if already enrolled
      const existingEnrollment = await db
        .select()
        .from(enrollments)
        .where(
          and(
            eq(enrollments.user_id, user.id),
            eq(enrollments.course_id, body.course_id)
          )
        )
        .limit(1)

      if (existingEnrollment.length > 0) {
        throw createError({
          statusCode: 400,
          message: 'Already enrolled in this course'
        })
      }

      // Create new enrollment
      const [newEnrollment] = await db
        .insert(enrollments)
        .values({
          user_id: user.id,
          course_id: body.course_id
        })
        .returning()

      return {
        success: true,
        enrollment: newEnrollment
      }
    } catch (error) {
      console.error('Error creating enrollment:', error)
      throw createError({
        statusCode: typeof error === 'object' && error !== null && 'statusCode' in error ? (error as any).statusCode : 500,
        message: typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : 'Failed to create enrollment'
      })
    }
  }

  // DELETE: Remove enrollment
  if (event.method === 'DELETE') {
    try {
      const enrollmentId = event.context.params?.id

      if (!enrollmentId) {
        throw createError({
          statusCode: 400,
          message: 'Enrollment ID is required'
        })
      }

      // Check if enrollment exists and belongs to user
      const existingEnrollment = await db
        .select()
        .from(enrollments)
        .where(
          and(
            eq(enrollments.id, enrollmentId),
            eq(enrollments.user_id, user.id)
          )
        )
        .limit(1)

      if (!existingEnrollment.length) {
        throw createError({
          statusCode: 404,
          message: 'Enrollment not found'
        })
      }

      // Delete enrollment
      await db
        .delete(enrollments)
        .where(eq(enrollments.id, enrollmentId))

      return {
        success: true,
        message: 'Enrollment deleted successfully'
      }
    } catch (error) {
      console.error('Error deleting enrollment:', error)
      throw createError({
        statusCode: (typeof error === 'object' && error !== null && 'statusCode' in error ? (error as any).statusCode : 500),
        message: (typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : 'Failed to delete enrollment')
      })
    }
  }

  throw createError({
    statusCode: 405,
    message: 'Method not allowed'
  })
})