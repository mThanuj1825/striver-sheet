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
	
	async function handleSubmit(e) {
		e.preventDefault();
		let response = await createuser(user);
		
		console.log(response);
	}
	
	function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}
	
	return (
		<div className={ "flex flex-col items-center" }>
			<form onSubmit={ handleSubmit } className={ "space-y-4 flex flex-col w-full" }>
				<Input placeholder={ "Username" } type={ "text" } name={ "username" } id={ "username" }
				       onChange={ handleChange } required={ true } maxLength={ 20 } />
				<Input placeholder={ "Email" } type={ "email" } name={ "email" } id={ "email" }
				       onChange={ handleChange } required={ true } maxLength={ 50 } />
				<Input placeholder={ "Password" } type={ "password" } name={ "password" } id={ "password" }
				       onChange={ handleChange } required={ true } maxLength={ 20 } />
				<Button className={ "min-w-[104px] mx-auto w-2/3" } type={ "submit" }>Create Account</Button>
			</form>
		</div>
	);
}