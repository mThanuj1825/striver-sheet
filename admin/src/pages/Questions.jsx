import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import { Question } from "../components/Question.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { getQuestionsFormatted } from "../utils/utils.js";

export function Questions() {
	const [questions, setQuestions] = useState({});
	const [loading, setLoading] = useState(true);
	const { user } = useContext(AuthContext);
	
	useEffect(() => {
		const fetchAllQuestions = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/api/questions/`);
				if (response.data.message === "No questions found") {
					return;
				}
				
				const questionsByStepAndTopic = getQuestionsFormatted(response.data);
				setQuestions((prevState) => {
					return { ...prevState, ...questionsByStepAndTopic };
				});
			} catch (err) {
				console.error("Failed to load questions", err);
			} finally {
				setLoading(false);
			}
		};
		
		if (user) {
			fetchAllQuestions();
		}
		
	}, [user]);
	
	if (loading) {
		return (
			<h1>Loading...</h1>
		);
	}
	
	const handleDeleteQuestion = async (id) => {
		try {
			await axios.delete(`http://localhost:3000/api/questions/${ id }`);
			
			const updatedQuestions = { ...questions };
			for (const step in updatedQuestions) {
				for (const lecture in updatedQuestions[step]) {
					updatedQuestions[step][lecture] = updatedQuestions[step][lecture].filter(
						(question) => question._id !== id,
					);
				}
			}
			
			setQuestions(updatedQuestions);
		} catch (err) {
			console.error("Failed to delete question", err);
		}
	};
	
	return (
		<div>
			<button>
				<Link to={ "/create-question" }>Create a new Question</Link>
			</button>
			<ul>
				{
					Object.keys(questions).length !== 0 &&
					Object.keys(questions).map((step) => (
						Object.keys(questions[step]).length !== 0 &&
						<div key={ step }>
							{
								Object.keys(questions[step]).map((lecture) => (
									questions[step][lecture].length !== 0 &&
									<div key={ step }>
										<h2>Step { step }</h2>
										<div key={ lecture }>
											<h4>Lecture { lecture }</h4>
											<ul>
												{
													questions[step][lecture].map((question) => {
														return <Question key={ uuid4() } question={ question }
														                 handleDeleteQuestion={ handleDeleteQuestion } />;
													})
												}
											</ul>
										</div>
									</div>
								))
							}
						</div>
					))
				}
			</ul>
		</div>
	);
}
