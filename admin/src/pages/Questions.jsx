import { Button } from "@/components/ui/button.jsx";
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
			await axios.delete(`https://striver-sheet.onrender.com/api/questions/${ id }`);
			
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
		<div className="mt-24">
			<div className="flex flex-row items-center justify-center mb-4">
				<Button>
					<Link to="/create-question">Create a new Question</Link>
				</Button>
			</div>
			<ul>
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
														{ questions[step][lecture].map((question) => (
															<Question key={ uuid4() } question={ question }
															          handleDeleteQuestion={ handleDeleteQuestion } />
														)) }
													</ul>
												) }
											</div>
										)
									)) }
							</div>
						)
					)) }
			</ul>
		</div>
	);
}
