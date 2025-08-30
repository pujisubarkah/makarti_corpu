// Update the path below if your db file is located elsewhere
import { db } from '../../db'
// Update the path below to the correct location of your users table/module
// Update the path below to the correct location of your users table/module
import { users } from '../../database/users'
import { courses } from '../../database/courses'
import { eq } from 'drizzle-orm'
import { H3Event } from 'h3'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event: H3Event) => {
  if (event.method === 'GET') {
    try {
      // Get all students with course_count from enrollments
      const { enrollments } = await import('../../database/enrollment')
      const students = await db
        .select({
          id: users.id,
          full_name: users.full_name,
          email: users.email,
          created_at: users.created_at,
          is_active: users.is_active,
          course_count: sql<number>`count(${enrollments.id})::int`
        })
        .from(users)
        .leftJoin(enrollments, eq(users.id, enrollments.user_id))
        .where(eq(users.role_id, 3))
        .groupBy(users.id)

      return students

    } catch (error) {
      console.error('Error fetching students:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch students'
      })
    }
  }

  // Handle unsupported methods
  throw createError({
    statusCode: 405,
    message: 'Method not allowed'
  })
})