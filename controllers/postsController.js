const { getPostsCollection } = require("../database");

const createPost = async (req, res) => {
  try {
    const postsCollection = await getPostsCollection();
    await postsCollection.insertOne(req.body);
    res.status(200).send("Post Successfully submitted");
  } catch (error) {
    res.status(500).send("Error during Post submission");
  }
};

const getAllPosts = async (req, res) => {
  try {
    const postsCollection = await getPostsCollection();
    const posts = await postsCollection.find().toArray();
    res.json(posts);
  } catch (err) {
    res.status(500).send("Error fetching posts");
  }
};

exports.createPost = createPost;
exports.getAllPosts = getAllPosts;
