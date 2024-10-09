import { Button } from "@/components/ui/button.jsx";

export function Question({ question, handleMarkCompleted, dashboard }) {
	return (
		<li className="pb-10">
			<div className="flex justify-between">
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight mr-2">{ question.title }</h4>
				{
					!dashboard &&
					<Button className={ "" } onClick={ () => handleMarkCompleted(question) }>
						Mark Completed
					</Button>
				}
			</div>
		</li>
	);
}
