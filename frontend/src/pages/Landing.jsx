import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";
import { Login } from "../components/Login.jsx";
import { Signup } from "../components/Signup.jsx";

export function Landing() {
	const [showLogin, setShowLogin] = useState(true);
	
	return (
		<div className={ "flex items-center justify-center min-h-screen" }>
			{
				showLogin ?
					<div className={ "flex flex-col w-1/2" }>
						<Login />
						<Button className={ "min-w-[132px] w-3/4 mx-auto my-4" } onClick={ () => setShowLogin(false) }>Create new
						                                                                                               Account</Button>
					</div>
					:
					<div className={ "flex flex-col w-1/2" }>
						<Signup />
						<Button className={ "min-w-[150px] w-5/6 mx-auto my-4" } onClick={ () => setShowLogin(true) }>Login existing
						                                                                                              account</Button>
					</div>
			}
		</div>
	);
}