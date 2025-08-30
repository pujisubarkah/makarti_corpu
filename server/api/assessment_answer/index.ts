import { db } from '../../db';
import { assessment_answers } from '~/server/database/schema/index';
import { eq } from 'drizzle-orm';

import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const method = event.req.method;

  if (method === 'GET') {
    // GET: /api/assessment_answer?user_id=1
    const user_id = Number(getQuery(event).user_id);
    if (user_id) {
      const data = await db.select().from(assessment_answers).where(eq(assessment_answers.user_id, user_id));
      return { answers: data };
    } else {
      const data = await db.select().from(assessment_answers);
      return { answers: data };
    }
  }

  if (method === 'POST') {
    // POST: /api/assessment_answer
    const body = await readBody(event);
    if (!body.user_id || !body.answers) {
      return { error: 'user_id dan answers wajib diisi' };
    }
    const inserted = await db.insert(assessment_answers).values({
      user_id: body.user_id,
      answers: body.answers,
    }).returning();
    return { answers: inserted };
  }

  return { error: 'Method not allowed' };
});
