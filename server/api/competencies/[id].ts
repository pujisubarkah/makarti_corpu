import { db } from '../../db';
import { competencies, competency_categories } from '~/server/database/schema';
import { eq } from 'drizzle-orm';

import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const method = event.req.method;
  const params = event.context.params || {};
  const id = params.id ? Number(params.id) : null;
  const body = method === 'PUT' || method === 'DELETE' ? await readBody(event) : null;
  if (!id) {
    return { error: 'ID parameter is required' };
  }

  // GET /api/competencies/:id
  if (method === 'GET') {
    const result = await db
      .select({
        id: competencies.id,
        name: competencies.name,
        description: competencies.description,
        category_id: competencies.category_id,
        category_name: competency_categories.name,
        category_description: competency_categories.description
      })
      .from(competencies)
      .leftJoin(competency_categories, eq(competencies.category_id, competency_categories.id))
      .where(eq(competencies.id, id));
    return result[0] || null;
  }

  // PUT /api/competencies/:id
  if (method === 'PUT') {
    if (!body?.name || !body?.category_id) {
      return { error: 'name and category_id required' };
    }
    const updated = await db.update(competencies)
      .set({
        name: body.name,
        category_id: body.category_id,
        description: body.description || ''
      })
      .where(eq(competencies.id, id))
      .returning();
    return updated[0] || null;
  }

  // DELETE /api/competencies/:id
  if (method === 'DELETE') {
    const deleted = await db.delete(competencies)
      .where(eq(competencies.id, id))
      .returning();
    return deleted[0] || null;
  }

  return { error: 'Method not allowed' };
});
