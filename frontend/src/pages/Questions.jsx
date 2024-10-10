import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import { Question } from "../components/Question.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { completeQuestion } from "../services/api.js";
import { getQuestionsFormatted } from "../utils/utils.js";

export function Questions() {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user, setUser } = useContext(AuthContext);
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
		const fetchAllQuestions = async () => {
			try {
				const response = await axios.get(`https://striver-sheet.onrender.com/api/questions/`);
				
				if (response.data.message === "No questions found") {
					console.log("No questions left");
					setQuestions([]);
				} else {
					
					const uncompletedQuestions = response.data.filter(
						(question) => !user.completedQuestions.includes(question._id),
					);
					
					const questionsByStepAndTopic = getQuestionsFormatted(uncompletedQuestions);
					
					setQuestions(questionsByStepAndTopic);
				}
			} catch (err) {
				console.error("Failed to load completed questions", err);
			} finally {
				setLoading(false);
			}
		};
		
		if (user) {
			fetchAllQuestions();
		}
	}, [user]);
	
	const fetchUserData = async () => {
		try {
			const response = await axios.get(`https://striver-sheet.onrender.com/api/users/${ user.username }`);
			setUser(response.data);
		} catch (err) {
			console.error("Failed to fetch user data", err);
		}
	};
	
	useEffect(() => {
		if (user) {
			fetchUserData();
		}
	}, [user?.username]);
	
	if (loading) {
		return (
			<h1>Loading...</h1>
		);
	}
	
	const handleMarkCompleted = async (question) => {
		try {
			const response = await completeQuestion(question._id);
			
			setQuestions((prevQuestions) => {
				const updatedQuestions = { ...prevQuestions };
				
				for (const step in updatedQuestions) {
					for (const lecture in updatedQuestions[step]) {
						updatedQuestions[step][lecture] = updatedQuestions[step][lecture].filter(q => q._id !== question._id);
						if (updatedQuestions[step][lecture].length === 0) {
							delete updatedQuestions[step][lecture];
						}
						
						if (Object.keys(updatedQuestions[step]).length === 0) {
							delete updatedQuestions[step];
						}
					}
				}
				
				return updatedQuestions;
			});
			
			return response;
		} catch (err) {
			console.error(err);
		}
	};
	
	return (
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
															return <Question key={ uuid4() } question={ question }
															                 handleMarkCompleted={ handleMarkCompleted } dashboard={ false } />;
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
	);
}

