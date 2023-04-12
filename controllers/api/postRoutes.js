const router = require("express").Router();
const { User, Post } = require("../../models");
const withAuth = require("../../utils/auth");

// API routes for posts
// Get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post by id
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["name"] }],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post (with authentication)
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post by id (with authentication)
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post by id (with authentication)
router.delete("/:id", withAuth, async (req, res) => {
  try {
    console.log(`Attempting to delete post with id: ${req.params.id}`);
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }

    console.log(`Deleted post with id: ${req.params.id}`);
    res.status(200).json(postData);
  } catch (err) {
    console.error(`Error deleting post with id: ${req.params.id}`);
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
