import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useState } from "react";
import { createuser } from "../services/api.js";

export function Signup() {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const [created, setCreated] = useState(null);
	
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await createuser(user);
			setCreated("Created");
		} catch (err) {
			setError("Username / Email already used for another account");
		}
	}
	
	function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}
	
	const usernameInput = document.getElementById("username");
	
	usernameInput.addEventListener("input", function () {
		this.setCustomValidity("");
		
		if (!this.validity.valid) {
			this.setCustomValidity("Please enter a valid roll number: XX891Axxxx or XX891axxxx");
		}
	});
	
	usernameInput.addEventListener("invalid", function () {
		this.setCustomValidity("Please enter a valid roll number: XX891Axxxx or XX891axxxx");
	});
	
	return (
		<div className={ "flex flex-col items-center" }>
			{ error && (
				<Alert className="my-4">
					<AlertTitle>Account creation failed.</AlertTitle>
					<AlertDescription>{ error }</AlertDescription>
				</Alert>
			) }
			{ created && (
				<Alert className="my-4">
					<AlertTitle>Account created. Please Log In.</AlertTitle>
				</Alert>
			) }
			<form onSubmit={ handleSubmit } className={ "space-y-4 flex flex-col w-full" }>
				<Input placeholder={ "Username" } type={ "text" } name={ "username" } id={ "username" }
				       onChange={ handleChange } required={ true } maxLength={ 20 } pattern={ "/^\\d{2}891[aA]\\d{4}$/" } />
				<Input placeholder={ "Email" } type={ "email" } name={ "email" } id={ "email" }
				       onChange={ handleChange } required={ true } maxLength={ 50 } />
				<Input placeholder={ "Password" } type={ "password" } name={ "password" } id={ "password" }
				       onChange={ handleChange } required={ true } maxLength={ 20 } />
				<Button className={ "min-w-[104px] mx-auto w-2/3" } type={ "submit" }>Create Account</Button>
			</form>
		</div>
	);
}