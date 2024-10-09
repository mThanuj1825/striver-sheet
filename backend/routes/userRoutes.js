const express = require("express");
const { getUser, getAllUsers } = require("../controllers/userController");

const router = express.Router();
router.get("/:username", getUser);
router.get("/", getAllUsers);

module.exports = router;