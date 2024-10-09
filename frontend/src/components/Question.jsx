import { Button } from "@/components/ui/button.jsx";

export function Question({ question, handleMarkCompleted, dashboard }) {
	return (
		<li className="pb-10">
			<div className="flex flex-row sm:flex-row justify-between items-start sm:items-center p-4">
				<h4 className="scroll-m-20 sm:text-base md:text-xl font-semibold tracking-tight mr-2">
					{ question.number }
				</h4>
				<h4 className="scroll-m-20 sm:text-base md:text-xl font-semibold tracking-tight mr-2">
					{ question.title }
				</h4>
				{
					!dashboard && (
						<div className="flex justify-center sm:justify-start w-full sm:w-auto mt-2 sm:mt-0">
							<Button onClick={ () => handleMarkCompleted(question) }>
								Mark Completed
							</Button>
						</div>
					)
				}
			</div>
		</li>
	);
}
