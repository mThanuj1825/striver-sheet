import axios from "axios";

const URL = "http://localhost:3000/api";

// 1. Create User
export async function createuser(user) {
	const response = await axios.post(`${ URL }/auth/signup`, user);
	
	if (response.status === 201) {
		return response;
	}
	
	return response.status(400).json({
		success: false,
	});
}

// 2. Get a question
export async function getQuestion(id) {
	try {
		const response = await axios.get(`${ URL }/questions/${ id }`);
		
		return response.data;
	} catch (err) {
		console.error("Failed to get question", err);
	}
}

// 3. Get all questions
export async function getAllQuestions() {
	try {
		const response = await axios.get(`${ URL }/questions/`);
		
		return response.data;
	} catch (err) {
		console.log("Failed to get questions", err);
	}
}

// 4. Mark question completed
export async function completeQuestion(id) {
	try {
		const response = await axios.post(`${ URL }/questions/complete`, { id });
		
		if (response.status === 200) {
			return response.data;
		}
		
		return {
			success: false,
			message: "Failed to complete the question",
		};
	} catch (err) {
		console.error("Failed to mark question as completed", err);
		return {
			success: false,
			message: err.message,
		};
	}
}
