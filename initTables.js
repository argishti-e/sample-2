import db from './clients/db.mysql.js'

(async () => {
  try {
    // users table
    await db.query(`
        CREATE TABLE IF NOT EXISTS users
        (
            id        BIGINT              NOT NULL AUTO_INCREMENT,
            fistName  VARCHAR(255)        NOT NULL,
            lastName  VARCHAR(255)        NOT NULL,
            password  VARCHAR(255)        NOT NULL,
            email     VARCHAR(255) UNIQUE NOT NULL,
            createdAt TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        );
    `);

    // posts table
    await db.query(`
        CREATE TABLE IF NOT EXISTS posts
        (
            id          BIGINT       NOT NULL AUTO_INCREMENT,
            title       VARCHAR(255) NOT NULL,
            description TEXT,
            createdAt   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
            userId      BIGINT,

            PRIMARY KEY (id),
            FOREIGN KEY (userId) REFERENCES users (id)
        );
    `);

    // post comments
    await db.query(`
        CREATE TABLE IF NOT EXISTS postComments
        (
            id             BIGINT    NOT NULL AUTO_INCREMENT,
            commentContent TEXT,
            createdAt      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            userId         BIGINT,
            postId         BIGINT,

            PRIMARY KEY (id),
            FOREIGN KEY (userId) REFERENCES users (id),
            FOREIGN KEY (postId) REFERENCES posts (id)
        );
    `);

    console.log('DB tables initialized');
  } catch (error) {
    console.error(error);
  }
})();
