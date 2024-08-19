import postsModel from '../models/posts.model.js'
import post from "../routes/post.js";

export default {
  async getPosts(req, res) {
    try {
      const postsList = await postsModel.getPosts()

      res.status(200).json({
        message: 'Posts list!',
        postsList,
      })
    } catch (e) {
      res.status(500).json({
        message: e.message,
      })
    }
  },

  async getSinglePost(req, res) {
    try {
      const { id } = req.params;

      const post = await postsModel.getPostByPk(id)

      if (!post) {
        res.status(404).json({
          status: 'error',
          message: 'Post not found',
        });
        return;
      }

      res.status(200).json({
        message: 'Post data',
        post,
      })
    } catch (e) {
      res.status(500).json({
        message: e.message,
      })
    }
  },

  async createPost(req, res) {
    try {
      const { id } = req.user;
      const { title, description } = req.body

      const post = await postsModel.createPost({
        userId: id,
        title,
        description,
      });


      res.status(200).json({
        message: 'Post created!',
        post,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  async updatePost(req, res) {
    try {
      const { id: userId } = req.user;
      const { id, title, description } = req.body

      if (!await postsModel.findByPk(id)) {
        res.status(404).json({
          message: 'Post not found',
        });
        return;
      }

      await postsModel.updatePost({
        id,
        userId,
        title,
        description,
      });

      res.status(200).json({
        message: 'success',
      })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deletePost(req, res) {
    try {
      const { id } = req.params;

      const result = await postsModel.deletePost({
        id,
        userId: req.user.id,
      });

      res.status(200).json({
        message: 'Post deleted successfully'
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  async searchPost(req, res) {
    try {
      const { s } = req.query;

      const result = await postsModel.searchPosts(s);

      res.status(200).json({
        message: 'Autocomplete results',
        result,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
}
