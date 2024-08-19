import usersModel from '../models/users.model.js'

export default {
  async registration(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body

      const mailExists = await usersModel.findByEmail(email);

      if (mailExists) {
        res.status(409).json({
          message: 'Email already exists!'
        });
        return;
      }

      const user = await usersModel.createUser({
        firstName,
        lastName,
        email,
        password: usersModel.utils.hashPassword(password),
      });

      delete user.password;

      res.status(201).json({
        message: 'User created successfully',
        user,
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await usersModel.findByEmail(email);

      if (!user || usersModel.utils.hashPassword(password) !== user.password) {
        res.status(401).json({
          message: 'Invalid email or password'
        });
        return;
      }

      const token = usersModel.utils.createToken({
        email: user.email,
        id: user.id
      });

      res.status(200).json({
        message: 'Login successful',
        token,
      })
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      })
    }
  },

  async getUsersList(req, res) {
    try {
      const usersList = await usersModel.getUsers();

      res.status(200).json({
        message: 'Users list',
        usersList,
      })
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error'
      })
    }
  },

  async getUserProfile(req, res) {
    try {
      const { id } = req.user;

      if (!id) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }

      const user = await usersModel.findByPk(id)

      if (!user) {
        res.status(404).json({
          message: 'User not found'
        });
        return;
      }

      delete user.password;

      res.status(200).json({
        message: 'User profile data',
        user,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  async updateUserProfile(req, res) {
    try {
      const { id } = req.user;
      const { firstName, lastName } = req.body;

      const user = await usersModel.findByPk(id)

      if (!user) {
        res.status(404).json({
          message: 'User not found'
        });
        return;
      }

      await usersModel.updateUser({
        firstName,
        lastName,
        email: user.email,
        password: user.password,
        id,
      })

      res.status(200).json({
        status: 'User updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
      })
    }
  },

  async deleteUser(req, res) {
    try {
      const { id, } = req.user;
      const { password } = req.body;

      const user = await usersModel.findByPk(id)

      if (!user) {
        res.status(404).json({
          message: 'User not found'
        });
        return;
      }

      if (usersModel.utils.hashPassword(password) !== user.password) {
        res.status(422).json({
          message: 'Passwords do not match',
        });
        return;
      }

      const result = await usersModel.deleteUser(id)

      res.status(200).json({
        message: 'User deleted successfully'
      })
    } catch (error) {
      res.status(500).json({ message: error.message, status: 500 })
    }
  },
}
