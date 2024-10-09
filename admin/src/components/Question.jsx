import { Button } from "@/components/ui/button.jsx";

export function Question({ handleDeleteQuestion, question }) {
	return (
		<li className="pb-10 flex flex-col sm:flex-row justify-between sm:items-start md:items-center p-4">
			<h4 className="scroll-m-20 sm:text-base md:text-xl font-semibold tracking-tight mr-2">
				Q{ question.number }:
			</h4>
			<h4 className="scroll-m-20 sm:text-base md:text-xl font-semibold tracking-tight mr-2">
				{ question.title }
			</h4>
			<Button onClick={ () => {
				handleDeleteQuestion(question._id);
			} }> Delete
			</Button>
		</li>
	);
}