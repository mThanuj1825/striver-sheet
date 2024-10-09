const express = require("express");
const {
	completeQuestion,
	getQuestion,
	getAllQuestions,
	deleteQuestion,
	createQuestion,
} = require("../controllers/questionController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", getAllQuestions);
router.get("/:id", getQuestion);
router.post("/complete", verifyToken, completeQuestion);

router.post("/", verifyToken, isAdmin, createQuestion);
router.delete("/:id", verifyToken, isAdmin, deleteQuestion);

module.exports = router;