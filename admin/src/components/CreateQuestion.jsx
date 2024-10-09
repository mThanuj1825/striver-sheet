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
	});
	
	const handleOnChange = (e) => {
		setQuestion({ ...question, [e.target.name]: e.target.value });
	};
	
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		
		console.log(question);
		
		try {
			const response = await axios.post(`http://localhost:3000/api/questions`, { ...question });
			
			if (response.status === 201) {
				setQuestion({
					title: "",
					description: "",
					step: 0,
					lecture: 0,
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
		<div>
			<form onSubmit={ handleOnSubmit }>
				<input type="text" name="title" id="title" placeholder="Title" value={ question.title }
				       onChange={ handleOnChange } />
				<input type="text" name="description" id="description" placeholder="Description" value={ question.description }
				       onChange={ handleOnChange } />
				<input type={ "number" } name={ "step" } id={ "step" } placeholder={ "Step" } value={ question.step }
				       onChange={ handleOnChange } />
				<input type={ "number" } name={ "lecture" } id={ "lecture" } value={ question.lecture }
				       placeholder={ "Lecture" }
				       onChange={ handleOnChange } />
				<button type={ "submit" }>Create Question</button>
			</form>
			<button onClick={ handleGoBack }>Back
			</button>
		</div>
	);
}