import { db } from '../../db';
import { assessment } from '~/server/database/schema';
import { eq } from 'drizzle-orm';

import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const method = event.req.method;

  if (method === 'GET') {
    // GET: /api/assessment?competency_id=1
    const competency_id = Number(getQuery(event).competency_id);
    if (competency_id) {
      const data = await db.select().from(assessment).where(eq(assessment.competency_id, competency_id));
      return { assessment: data };
    } else {
      const data = await db.select().from(assessment);
      return { assessment: data };
    }
  }

  if (method === 'POST') {
    // POST: /api/assessment
    const body = await readBody(event);
    if (!body.competency_id || !body.question) {
      return { error: 'competency_id dan question wajib diisi' };
    }
    const inserted = await db.insert(assessment).values({
      // If 'id' is auto-generated (e.g., SERIAL/AUTOINCREMENT), do not include it here.
      competency_id: body.competency_id,
      question: body.question,
    }).returning();
    return { assessment: inserted };
  }


  return { error: 'Method not allowed' };
});
