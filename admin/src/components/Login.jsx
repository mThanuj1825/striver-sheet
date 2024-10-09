import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useContext(AuthContext);
	
	const navigate = useNavigate();
	
	const handleLogin = async () => {
		try {
			const response = await axios.post(`http://localhost:3000/api/auth/admin/login`, { username, password });
			await login(response.data);
			
			navigate("/dashboard");
		} catch (err) {
			console.error("Login failed:", err);
		}
	};
	
	return (
		<div className={ "" }>
			<TextField variant={ "outlined" } placeholder={ "Username" } type={ "text" } value={ username }
			           onChange={ (e) => setUsername(e.target.value) } />
			<TextField variant={ "outlined" } placeholder={ "Password" } type={ "password" } value={ password }
			           onChange={ (e) => setPassword(e.target.value) } />
			<Button variant={ "contained" } onClick={ handleLogin }>Login</Button>
		</div>
	);
}
