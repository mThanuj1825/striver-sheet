import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";

export function Layout() {
	return (
		<>
			<Navbar />
			<main>
				<Outlet />
			</main>
		</>
	);
}