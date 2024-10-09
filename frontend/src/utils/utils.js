export function getQuestionsFormatted(questions) {
	const questionsByStepAndTopic = {};
	
	questions.forEach((question) => {
		const step = question.step;
		const lecture = question.lecture;
		
		if (!questionsByStepAndTopic[step]) {
			questionsByStepAndTopic[step] = {};
		}
		
		if (!questionsByStepAndTopic[step][lecture]) {
			questionsByStepAndTopic[step][lecture] = [];
		}
		
		questionsByStepAndTopic[step][lecture].push(question);
	});
	
	return questionsByStepAndTopic;
}