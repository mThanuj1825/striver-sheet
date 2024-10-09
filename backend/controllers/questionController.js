const User = require("../models/User");
const Question = require("../models/Question");

const completeQuestion = async (req, res) => {
	try {
		const { id } = req.body;
		const userId = req.user.userId;
		const user = await User.findById(userId);
		
		if (!user.completedQuestions.includes(id)) {
			user.completedQuestions.push(id);
			await user.save();
		}
		res.status(200).json(user);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

const getQuestion = async (req, res) => {
	try {
		const id = req.params.id;
		const question = await Question.findById(id);
		
		if (!question) {
			return res.status(404).send("Question not found");
		}
		
		res.status(200).json(question);
	} catch (err) {
		res.status(500).json({
			message: "server error",
		});
	}
};

const getAllQuestions = async (req, res) => {
	try {
		const questions = await Question.find();
		
		if (!questions || questions.length === 0) {
			return res.status(200).json({
				message: "No questions found",
			});
		}
		
		res.status(200).json(questions);
	} catch (err) {
		res.status(500).json({
			message: "server error",
		});
	}
};

const createQuestion = async (req, res) => {
	try {
		const { title, description, step, lecture } = req.body;
		const newQuestion = new Question({ title, description, step, lecture });
		await newQuestion.save();
		res.status(201).json(newQuestion);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const deleteQuestion = async (req, res) => {
	try {
		const id = req.params.id;
		const question = await Question.findByIdAndDelete(id);
		
		if (!question) {
			res.status(404).json({ message: "Question not found" });
			return;
		}
		
		await User.updateMany(
			{},
			{
				$pull: {
					completedQuestions: id,
				},
			},
		);
		
		res.status(201).json({
			message: "Successfully deleted",
		});
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = { completeQuestion, getQuestion, getAllQuestions, deleteQuestion, createQuestion };