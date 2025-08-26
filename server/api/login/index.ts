import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { users } from '../../database/users'
import { readBody } from 'h3'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  try {
    if (event.method !== 'POST') {
      return { error: 'Method not allowed' }
    }

    const body = await readBody(event)
    const { email, password } = body

    // Ambil user berdasarkan email
    const result = await db
      .select({
        id: users.id,
        email: users.email,
        full_name: users.full_name,
        role: users.role,
        role_id: users.role_id, // tambahkan role_id
        passwordHash: users.password_hash
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    const user = result[0]

    if (!user) throw new Error('Email tidak ditemukan')

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) throw new Error('Password salah')

    // Buang password sebelum kirim ke client
    const { passwordHash, ...userData } = user

    return { success: true, user: userData }
  } catch (err) {
    console.error('Login error:', err)
    return { error: err instanceof Error ? err.message : 'Terjadi kesalahan server' }
  }
})
