import _ from 'lodash';
import md5 from 'md5';
import cryptoJS from "crypto-js";

import db from '../clients/db.mysql.js'

const { USER_PASSWORD_SECRET } = process.env;

export default {
  findByPk: async (id) => {
    const [rows] = await db.query(
      `
          SELECT *
          FROM users
          WHERE id = ?
          LIMIT 1;
      `,
      [id],
    )

    return rows.length > 0 ? _.head(rows) : null;
  },

  findByEmail: async (email) => {
    const [rows] = await db.query(
      `
          SELECT *
          FROM users
          WHERE email = ?
          LIMIT 1;
      `,
      [email],
    )

    return rows.length > 0 ? _.head(rows) : null;
  },

  createUser: async ({ firstName, lastName, email, password }) => {
    const [rows] = await db.query(
      `
          INSERT INTO users (fistName, lastName, email, password)
          VALUES (?, ?, ?, ?);
      `,
      [firstName, lastName, email.toLowerCase(), password]
    );

    return rows.length > 0 ? _.head(rows) : null;
  },

  getUsers: async () => {
    const [rows] = await db.query(
      `
          SELECT *
          FROM users;
      `
    );

    return rows;
  },

  updateUser: async ({ id, firstName, lastName, email, password }) => {
    const [rows] = await db.query(
      `
          UPDATE users
          SET fistName = ?,
              lastName = ?,
              email    = ?,
              password = ?
          WHERE id = ?;
      `,
      [firstName, lastName, email, password, id]
    );

    return rows.length > 0 ? _.head(rows) : null;
  },

  deleteUser: async (id) => {
    const [rows] = await db.query(
      `
          DELETE
          FROM users
          WHERE id = ?
      `,
      [id],
    );

    return rows.length > 0 ? _.head(rows) : null;
  },

  utils: {
    hashPassword: (password) => {
      return md5(md5(password) + USER_PASSWORD_SECRET)
    },
    createToken: (data) => cryptoJS
      .AES
      .encrypt(
        JSON.stringify(data),
        USER_AUTH_SECRET,
      ).toString(),
  }
}
