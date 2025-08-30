
import { db } from '../../db'
import { assessment_answers } from "@/server/database/schema"
import { sql } from "drizzle-orm"

import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const userId = 1 // ambil dari session auth

  // ambil jawaban terbaru user
  const result = await db
    .select()
    .from(assessment_answers)
    .where(sql`${assessment_answers.user_id} = ${userId}`)
    .orderBy(sql`created_at DESC`)
    .limit(1)

  if (result.length === 0) {
    return { error: "Belum ada assessment" }
  }

  const answers = result[0].answers // JSON
  return { answers }
})
