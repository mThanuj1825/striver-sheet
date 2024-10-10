import { Question } from "@/components/Question.jsx";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import { AuthContext } from "../context/AuthContext.jsx";
import { getQuestion } from "../services/api.js";
import { getQuestionsFormatted } from "../utils/utils.js";

export function Dashboard() {
	const { user } = useContext(AuthContext);
	const [completedQuestions, setCompletedQuestions] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [openSteps, setOpenSteps] = useState({});
	const [openLectures, setOpenLectures] = useState({});
	
	// Toggle Step
	const toggleStep = (step) => {
		setOpenSteps((prev) => ({
			...prev,
			[step]: !prev[step],
		}));
	};
	
	// Toggle Lecture
	const toggleLecture = (step, lecture) => {
		setOpenLectures((prev) => ({
			...prev,
			[`${ step }-${ lecture }`]: !prev[`${ step }-${ lecture }`],
		}));
	};
	
	useEffect(() => {
		const fetchCompletedQuestions = async () => {
			try {
				const response = await axios.get(`https://striver-sheet.onrender.com/api/users/${ user?.username }`);
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
			<ul className={ "mt-4" }>
				{ Object.keys(questions).length !== 0 &&
					Object.keys(questions).map((step) => (
						Object.keys(questions[step]).length !== 0 && (
							<div key={ uuid4() }>
								<div className="cursor-pointer" onClick={ () => toggleStep(step) }>
									<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-4">
										Step { step } { openSteps[step] ? <i className="fa-regular fa-circle-down"></i> :
										<i className="fa-regular fa-circle-right"></i> }
									</h1>
								</div>
								{ openSteps[step] &&
									Object.keys(questions[step]).map((lecture) => (
										questions[step][lecture].length !== 0 && (
											<div key={ uuid4() }>
												<div className="cursor-pointer" onClick={ () => toggleLecture(step, lecture) }>
													<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
														Lecture { lecture } { openLectures[`${ step }-${ lecture }`] ?
														<i className="fa-regular fa-circle-down"></i> :
														<i className="fa-regular fa-circle-right"></i> }
													</h2>
												</div>
												{ openLectures[`${ step }-${ lecture }`] && (
													<ul>
														{
															questions[step][lecture].map((question) => {
																return <Question key={ uuid4() } question={ question } dashboard={ true } />;
															})
														}
													</ul>
												) }
											</div>
										)
									)) }
							</div>
						)
					)) }
			</ul>
		</>
	);
}
