import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";

export function Layout() {
	return (
		<div className={ "flex flex-col m-auto w-3/4" }>
			<Navbar />
			<main className="pt-20 px-4">
				<Outlet />
			</main>
		</div>
	);
}
