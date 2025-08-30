import { db } from '../../db'
import { notifikasi } from '../../database/notifikasi'
import { eq } from 'drizzle-orm'

import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const params = event.context.params
  if (!params || !params.id) {
    throw new Error('Missing user id in request parameters')
  }
  const userId = params.id
  const notif = await db.select().from(notifikasi).where(eq(notifikasi.user_id, userId))
  return notif
})
