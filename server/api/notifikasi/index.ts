import { db } from '../../db'
import { notifikasi } from '../../database/notifikasi'
import { H3Event, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  if (event.method === 'GET') {
    // Ambil semua notifikasi
    const allNotif = await db.select().from(notifikasi)
    return allNotif
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    if (!body.user_id || !body.pesan || !body.created_by) {
      return { error: 'user_id, pesan, dan created_by wajib diisi' }
    }
    const inserted = await db.insert(notifikasi).values({
      user_id: body.user_id,
      pesan: body.pesan,
      dibaca: body.dibaca ?? false,
      created_by: body.created_by,
    }).returning()
    return inserted[0]
  }

  event.res.statusCode = 405
  return { error: 'Method not allowed' }
})