import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateQuestion() {
	const navigate = useNavigate();
	const [question, setQuestion] = useState({
		title: "",
		description: "",
		step: 0,
		lecture: 0,
		number: 0,
	});
	
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		
		setQuestion((prevQuestion) => ({
			...prevQuestion,
			[name]: name === "step" || name === "lecture" || name === "number" ? parseInt(value, 10) || 0 : value,
		}));
	};
	
	const handleOnSubmit = async () => {
		console.log("here");
		try {
			const response = await axios.post(`https://striver-sheet.onrender.com/api/questions`, { ...question });
			
			if (response.status === 201) {
				setQuestion({
					title: "",
					description: "",
					step: question.step,
					lecture: question.lecture,
					number: question.number + 1,
				});
			}
		} catch (error) {
			console.error("Error creating question", error);
		}
	};
	
	const handleGoBack = () => {
		navigate(-1);
	};
	
	return (
		<div className={ "flex flex-col items-center justify-center min-h-screen" }>
			<div className={ "flex flex-col items-center gap-y-3 w-3/4" }>
				<Input type="text" name="title" id="title" placeholder="Title" value={ question.title }
				       onChange={ handleOnChange } />
				<Input type="text" name="description" id="description" placeholder="Description" value={ question.description }
				       onChange={ handleOnChange } />
				<Input type={ "number" } name={ "step" } id={ "step" } placeholder={ "Step" } value={ question.step }
				       onChange={ handleOnChange } />
				<Input type={ "number" } name={ "lecture" } id={ "lecture" } value={ question.lecture }
				       placeholder={ "Lecture" }
				       onChange={ handleOnChange } />
				<Input type={ "number" } name={ "number" } id={ "number" } value={ question.number }
				       placeholder={ "Number" }
				       onChange={ handleOnChange } />
				<Button onClick={ handleOnSubmit }>Create Question</Button>
				<Button onClick={ handleGoBack }>Back
				</Button>
			</div>
		</div>
	);
}
