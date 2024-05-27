const express = require("express");
const postsController = require("../controllers/postsController");
const router = express.Router();

router.post("/createPost", postsController.createPost);
router.get("/getAllPosts", postsController.getAllPosts);

module.exports = router;
