import jsonwebtoken from 'jsonwebtoken'
const { verify } = jsonwebtoken
import { db } from '../db'
import { users } from '../database/users'
import { eq } from 'drizzle-orm'

import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const authHeader = event.req.headers['authorization'] || event.req.headers['Authorization']
  if (!authHeader) return

  const headerValue = Array.isArray(authHeader) ? authHeader[0] : authHeader
  const token = headerValue.replace('Bearer ', '')
  try {
    // Gunakan secret dari environment variable
    const jwtSecret = process.env.JWT_SECRET || 'default_secret_key'
    const payload = verify(token, jwtSecret) as { id: string }
    if (!payload?.id) return
    const user = await db.select().from(users).where(eq(users.id, payload.id)).limit(1)
    if (user.length) {
      event.context.user = user[0]
    }
  } catch (err) {
    // Token invalid, user tidak diisi
  }
})
