import { db } from '../../db';
import { assessment } from '~/server/database/schema';
import { eq } from 'drizzle-orm';

import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const method = event.req.method;
  const id = Number(event.context.params?.id);

  if (method === 'GET') {
    // GET: /api/assessment/[id]
    if (!id) return { error: 'id wajib diisi' };
    const data = await db.select().from(assessment).where(eq(assessment.id, id));
    return { assessment: data };
  }

  if (method === 'PUT') {
    // PUT: /api/assessment/[id]
    const body = await readBody(event);
    if (!body.question) {
      return { error: 'question wajib diisi' };
    }
    const updated = await db.update(assessment)
      .set({ question: body.question })
      .where(eq(assessment.id, id))
      .returning();
    return { assessment: updated };
  }

  if (method === 'DELETE') {
    // DELETE: /api/assessment/[id]
    const deleted = await db.delete(assessment)
      .where(eq(assessment.id, id))
      .returning();
    return { assessment: deleted };
  }

  return { error: 'Method not allowed' };
});
