import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useContext(AuthContext);
	const [error, setError] = useState(null);
	
	const navigate = useNavigate();
	
	const handleLogin = async () => {
		try {
			const response = await axios.post(`https://striver-sheet.onrender.com/api/auth/admin/login`, {
				username,
				password,
			});
			console.log(response);
			await login(response.data);
			
			navigate("/dashboard");
		} catch (err) {
			setError("Invalid username or password. Please try again.");
		}
	};
	
	return (
		<div className={ "flex flex-col items-center justify-center min-h-screen" }>
			{ error && (
				<Alert className="my-4">
					<AlertTitle>Authentication Failed</AlertTitle>
					<AlertDescription>{ error }</AlertDescription>
				</Alert>
			) }
			<div className={ "flex flex-col items-center  gap-y-3" }>
				<Input placeholder={ "Username" } type={ "text" } value={ username }
				       onChange={ (e) => setUsername(e.target.value) } />
				<Input placeholder={ "Password" } type={ "password" } value={ password }
				       onChange={ (e) => setPassword(e.target.value) } />
				<Button className={ "min-w-[41px] w-1/4" } onClick={ handleLogin }>Login</Button>
			</div>
		</div>
	);
}
