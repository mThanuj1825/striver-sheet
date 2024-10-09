import { Question } from "@/components/Question.jsx";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { v4 as uuid4, v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/AuthContext.jsx";
import { getQuestion } from "../services/api.js";
import { getQuestionsFormatted } from "../utils/utils.js";

export function Dashboard() {
	const { user } = useContext(AuthContext);
	const [completedQuestions, setCompletedQuestions] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const fetchCompletedQuestions = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/api/users/${ user?.username }`);
				setCompletedQuestions(response.data.completedQuestions);
			} catch (err) {
				console.error("Failed to load completed questions", err);
			} finally {
				setLoading(false);
			}
		};
		
		if (user) {
			fetchCompletedQuestions();
		}
	}, [user]);
	
	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const questionPromises = completedQuestions.map((questionId) => getQuestion(questionId));
				const questionsData = await Promise.all(questionPromises);
				const formattedQuestions = getQuestionsFormatted(questionsData);
				setQuestions(formattedQuestions);
			} catch (err) {
				console.error("Failed to load question details", err);
			}
		};
		
		if (completedQuestions.length > 0) {
			fetchQuestions();
		}
	}, [completedQuestions]);
	
	if (loading) {
		return <div>Loading...</div>;
	}
	
	return (
		<>
			<h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl pb-4 my-4">{ user?.username }'s
			                                                                                                           Dashboard</h1>
			<ul>
				{
					Object.keys(questions).map((step) => (
						<div key={ uuidv4() }>
							<h1
								className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">Step { step }</h1>
							{
								Object.keys(questions[step]).map((lecture) => (
									<div key={ uuidv4() } className={ "flex flex-col mt-2" }>
										<h2
											className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Lecture { lecture }</h2>
										<ul>
											{
												questions[step][lecture].map((question) => (
													<Question key={ uuid4() } question={ question } dashboard={ true } />
												))
											}
										</ul>
									</div>
								)) }
						</div>
					)) }
			</ul>
		</>
	);
}
