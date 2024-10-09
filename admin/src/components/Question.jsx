export function Question({ handleDeleteQuestion, question }) {
	return (
		<>
			<li>{ question.title }</li>
			<button onClick={ () => {
				handleDeleteQuestion(question._id);
			} }> Delete
			</button>
		</>
	);
}