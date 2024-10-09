import { Link } from "react-router-dom";
import { pageData } from "../services/pageData.js";

export function Navbar() {
	return (
		<div>
			{
				pageData.map((data, index) => {
					return (
						<Link to={ data.path } key={ index }>{ data.name }</Link>
					);
				})
			}
		</div>
	);
}