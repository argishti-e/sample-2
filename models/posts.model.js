import _ from "lodash";
import db from '../clients/db.mysql.js'

export default {
  getPostByPk: async (id) => {
    const [rows] = await db.query(
      `
          SELECT *
          FROM posts
          WHERE id = ?
      `,
      [id]
    )

    return rows.length > 0 ? _.head(rows) : null;
  },

  getPosts: async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM posts;
    `);

    return rows;
  },

  createPost: async ({ userId, title, description }) => {
    const [rows] = await db.query(
      `
          INSERT INTO posts (userId, title, description)
          VALUES (?, ?, ?);
      `,
      [userId, title, description],
    );

    return this.getPostByPk(rows.insertId);
  },

  updatePost: async ({
    id,
    userId,
    title,
    description,
  }) => {
    const [rows] = await db.query(
      `
          UPDATE posts
          SET title       = ?,
              description = ?
          WHERE id = ?
            AND userId = ?;
      `,
      [title, description, id, userId]
    );

    return rows.length > 0 ? _.head(rows) : null;
  },

  deletePost: async ({id, userId}) => {
    const [rows] = await db.query(
      `
          DELETE
          FROM posts
          WHERE id = ?
            AND userId = ?
      `,
      [id, userId]
    );

    return rows.length > 0 ? _.head(rows) : null;
  },

  searchPosts: async (s) => {
    let word = s.trim().toLowerCase();

    word = word.replace(/\s+/, '.+?');

    const [rows] = await db.query(
      `
          SELECT *
          FROM posts
          WHERE LOWER(title) REGEXP '${word}'
          LIMIT 10;
      `
    );

    return rows.length > 0 ? rows : null;
  },
}
