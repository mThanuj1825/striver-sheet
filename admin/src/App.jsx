import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateQuestion } from "./components/CreateQuestion.jsx";
import { Layout } from "./components/Layout.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Landing } from "./pages/Landing.jsx";
import { Questions } from "./pages/Questions.jsx";
import { Students } from "./pages/Students.jsx";
import "./App.css";

export default function App() {
	axios.interceptors.request.use(
		(config) => {
			const token = sessionStorage.getItem("jwtToken");
			if (token) {
				config.headers.authorization = `Bearer ${ token }`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);
	
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path={ "/" } element={ <Landing /> } />
					<Route element={ <Layout /> }>
						<Route path="/questions" element={ <Questions /> } />
						<Route path="/students" element={ <Students /> } />
						<Route path="/dashboard" element={ <Dashboard /> } />
					</Route>
					<Route path={ "/create-question" } element={ <CreateQuestion /> } />
				</Routes>
			</Router>
		</AuthProvider>
	);
}