import { Button } from "@/components/ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { pageData } from "../services/pageData.js";

export function Navbar() {
	const navigate = useNavigate();
	
	function handleLogout() {
		sessionStorage.removeItem("jwtToken");
		localStorage.removeItem("user");
		navigate("/");
	}
	
	return (
		<div className={ "flex gap-10 justify-center items-center w-full fixed top-0 left-0 bg-primary h-20" }>
			{
				pageData.map((data, index) => {
					return (
						<Button key={ index } className={ "border border-accent" }>
							<Link to={ data.path } key={ index } className={ "text-2xl" }>{ data.name }</Link>
						</Button>
					);
				})
			}
			<Button className={ "border border-accent" } onClick={ handleLogout }>
				<Link to={ "/" } className={ "text-2xl" }>Logout</Link>
			</Button>
		</div>
	);
}