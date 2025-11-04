// src/app/lib/neon.js
import { Pool } from "pg";

// --- POOL SETUP (must be at top) ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 20,
});

async function query(text, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

// --- EXPORTED FUNCTIONS ---

// CATEGORIES
export async function getCategories() {
  const result = await query("SELECT id, name, slug FROM categories ORDER BY name");
  return result.rows;
}

export async function getCategoryById(id) {
  const result = await query("SELECT * FROM categories WHERE id = $1", [id]);
  return result.rows[0] || null;
}

// POSTS WITH CATEGORY
export async function getPostsWithCategory({ published = true, limit = 10, slug = null } = {}) {
  let q = `
    SELECT p.*, c.name AS category_name, c.slug AS category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;
  const params = [];
  let i = 1;

  if (published) {
    q += ` AND p.published = $${i++}`;
    params.push(true);
  }
  if (slug) {
    q += ` AND p.slug = $${i++}`;
    params.push(slug);
  }
  q += ` ORDER BY p.created_at DESC LIMIT $${i}`;
  params.push(limit);

  const result = await query(q, params);
  return result.rows;
}

export async function getPostBySlug(slug) {
  const posts = await getPostsWithCategory({ published: true, limit: 1, slug });
  return posts[0] || null;
}

export async function createPost({ title, slug, content, excerpt = "", published = false, category_id }) {
  const result = await query(
    `INSERT INTO posts 
       (title, slug, content, excerpt, published, published_at, category_id)
     VALUES ($1,$2,$3,$4,$5,NOW(),$6)
     RETURNING *`,
    [title, slug, content, excerpt, published, category_id]
  );
  return result.rows[0];
}

export async function updatePost(id, { title, slug, content, excerpt, published, category_id }) {
  const q = `
    UPDATE posts SET
      title = $1, slug = $2, content = $3, excerpt = $4,
      published = $5, ${published ? "published_at = NOW()," : ""}
      category_id = $6,
      updated_at = NOW()
    WHERE id = $7 RETURNING *
  `;
  const result = await query(q, [title, slug, content, excerpt, published, category_id, id]);
  return result.rows[0];
}

export async function deletePost(id) {
  const result = await query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
  return result.rows.length > 0;
}
