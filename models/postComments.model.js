import db from '../clients/db.mysql.js'

export default {
  getPostComments: async (postId) => {
    const [rows] = await db.query(
      `
          SELECT postComments.id,
                 postComments.commentContent,
                 postComments.createdAt,
                 users.id                                    AS userId,
                 CONCAT(users.fistName, ' ', users.lastName) AS userName
          FROM postComments
                   LEFT JOIN users
                             ON postComments.userId = users.id
          WHERE postComments.postId = 1
          ORDER BY postComments.createdAt DESC;
      `,
      [postId],
    )

    return rows;
  },

  createPostComment: async ({ userId, postId, commentContent }) => {
    const [rows] = await db.query(
      `
          INSERT INTO postComments (userId, postId, commentContent)
          VALUES (?, ?, ?);
      `,
      [userId, postId, commentContent],
    );

    return rows;
  },
}
