const { getUsersCollection } = require("../database");

const registerUser = async (req, res) => {
  try {
    const usersCollection = await getUsersCollection();
    await usersCollection.insertOne(req.body);
    res.status(200).send("User successfuly registered");
  } catch (error) {
    res.status(500).send("Error during Registeration");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({
      email: email,
      password: password,
    });
    if (user && user.password === password) {
      res.json({ email: user.email, username: user.username });
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    res.status(500).send("Error during login");
  }
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
