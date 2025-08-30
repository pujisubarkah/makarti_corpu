import { db } from '../../db';
import { competencies, competency_categories } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const method = event.req.method
  const query = getQuery(event)
  const body = method === 'POST' ? await readBody(event) : null

  // GET /api/competencies (all, by id, or by category name)
  if (method === 'GET') {
    if (query.id) {
      const result = await db.select().from(competencies).where(eq(competencies.id, Number(query.id)));
      return result[0] || null;
    }
    const selectObj = {
      id: competencies.id,
      name: competencies.name,
      description: competencies.description,
      category_id: competencies.category_id,
      category_name: competency_categories.name,
      category_description: competency_categories.description
    };
    let result;
    if (query.category) {
      result = await db
        .select(selectObj)
        .from(competencies)
        .leftJoin(competency_categories, eq(competencies.category_id, competency_categories.id))
        .where(eq(competency_categories.name, String(query.category)));
    } else {
      result = await db
        .select(selectObj)
        .from(competencies)
        .leftJoin(competency_categories, eq(competencies.category_id, competency_categories.id));
    }
    return result;
  }

  // POST /api/competencies (create)
  if (method === 'POST') {
    if (!body?.name || !body?.category_id) {
      return { error: 'name and category_id required' };
    }
    // Ambil semua id, cari terbesar
    const all = await db.select({ id: competencies.id }).from(competencies);
    const maxId = all.length ? Math.max(...all.map(c => c.id)) : 0;
    const newId = maxId + 1;
    const inserted = await db.insert(competencies).values({
      id: newId,
      name: body.name,
      category_id: body.category_id,
      description: body.description || ''
    }).returning();
    return inserted[0];
  }

  return { error: 'Method not allowed' };
});
