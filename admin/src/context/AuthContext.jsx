import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authToken, setAuthToken] = useState(sessionStorage.getItem("jwtToken") || null);
	
	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"));
		if (storedUser) {
			setUser(storedUser.user);
		}
	}, []);
	
	const login = (data) => {
		setUser(data.user);
		setAuthToken(data.token);
		localStorage.setItem("user", JSON.stringify(data));
		sessionStorage.setItem("jwtToken", data.token);
	};
	
	const logout = () => {
		setUser(null);
		setAuthToken(null);
		localStorage.removeItem("user");
		sessionStorage.removeItem("jwtToken");
	};
	
	return (
		<AuthContext.Provider value={ { user: user, login, logout, authToken, setUser: setUser } }>
			{ children }
		</AuthContext.Provider>
	);
};