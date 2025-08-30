import { db } from '../../db';
import { competency_categories } from '~/server/database/schema';
import { eq } from 'drizzle-orm';

import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const method = event.req.method;
  const query = getQuery(event);
  const body = method === 'POST' ? await readBody(event) : null;

  // GET /api/categories (all or by id)
  if (method === 'GET') {
    if (query.id) {
      const result = await db.select().from(competency_categories).where(eq(competency_categories.id, Number(query.id)));
      return result[0] || null;
    }
    return await db.select().from(competency_categories);
  }

  // POST /api/categories (create)
  if (method === 'POST') {
    if (!body?.name) {
      return { error: 'name required' };
    }
    // Ambil semua id, cari terbesar
    const all = await db.select({ id: competency_categories.id }).from(competency_categories);
    const maxId = all.length ? Math.max(...all.map(c => c.id)) : 0;
    const newId = maxId + 1;
    const inserted = await db.insert(competency_categories).values({
      id: newId,
      name: body.name,
      description: body.description || ''
    }).returning();
    return inserted[0];
  }

  return { error: 'Method not allowed' };
});
