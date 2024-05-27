const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

router.post("/registerUser", usersController.registerUser);
router.post("/loginUser", usersController.loginUser);

module.exports = router;
