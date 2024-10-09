import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.jsx";
import { Input } from "@/components/ui/input.jsx";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Button } from "./ui/button.jsx";

export function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const { login } = useContext(AuthContext);
	
	const navigate = useNavigate();
	
	const handleLogin = async () => {
		try {
			const response = await axios.post(`http://localhost:3000/api/auth/login`, { username, password });
			await login(response.data);
			console.log("here");
			
			navigate("/dashboard");
		} catch (err) {
			setError("Invalid username or password. Please try again.");
		}
	};
	
	return (
		<div className={ "flex flex-col items-center justify-center gap-y-3" }>
			{ error && (
				<Alert className="my-4">
					<AlertTitle>Authentication Failed</AlertTitle>
					<AlertDescription>{ error }</AlertDescription>
				</Alert>
			) }
			<Input placeholder={ "Username" } type={ "text" } value={ username }
			       onChange={ (e) => setUsername(e.target.value) } />
			<Input placeholder={ "Password" } type={ "password" } value={ password }
			       onChange={ (e) => setPassword(e.target.value) } />
			<Button onClick={ handleLogin } className={ "min-w-[41px] w-1/4" }>Login</Button>
		</div>
	);
}
