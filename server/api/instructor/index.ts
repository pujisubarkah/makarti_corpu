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
      // Get all instructors with published course count
      const instructors = await db
        .select({
          id: users.id,
          full_name: users.full_name,
          email: users.email,
          created_at: users.created_at,
          is_active: users.is_active,
          course_count: sql<number>`count(CASE WHEN ${courses.is_published} = true THEN ${courses.id} END)::int`
        })
        .from(users)
        .leftJoin(courses, eq(users.id, courses.instructor_id))
        .where(eq(users.role_id, 2))
        .groupBy(users.id)
        
      return instructors

    } catch (error) {
      console.error('Error fetching instructors:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch instructors'
      })
    }
  }

  // Handle unsupported methods
  throw createError({
    statusCode: 405,
    message: 'Method not allowed'
  })
})