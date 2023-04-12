const router = require("express").Router();
const { User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// API routes for comments
// Get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single comment by id
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["name"] }],
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment (with authentication)
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment by id (with authentication)
router.delete("/:id", withAuth, async (req, res) => {
  try {
    console.log("Deleting comment with id:", req.params.id);
    console.log("User id from session:", req.session.user_id);
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentId = req.params.id;
    const updatedCommentBody = req.body.comment_text;

    const comment = await Comment.findOne({ where: { id: commentId } });

    if (comment && comment.user_id === req.session.user_id) {
      comment.comment_text = updatedCommentBody;
      await comment.save();
      res.status(200).json({ message: "Comment updated" });
    } else if (!comment) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res
        .status(403)
        .json({ message: "Forbidden: You can only edit your own comments" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating comment" });
  }
});

module.exports = router;
