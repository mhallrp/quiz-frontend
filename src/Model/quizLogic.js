export const useQuiz = (props, answers) => {
  
  const handleNextQuestion = () => {
    props.setCorrect(undefined);
    props.setSelected(undefined);
    if (props.remainingQuestions.length !== 1) {
      props.setRemainingQuestions((prevQuestions) => prevQuestions.slice(1));
    } else {
      const totalQuestions = props.triviaQuestions.length;
      alert(`Your score is ${props.score}/${totalQuestions}`);
      props.fetchQuestions();
      props.setScore(0);
    }
  };

  const checkAnswer = () => {
    if (props.selected != null) {
      if (
        answers[props.selected] === props.remainingQuestions[0].correct_answer
      ) {
        props.setScore((prevScore) => prevScore + 1);
      }
      props.setCorrect(
        answers.indexOf(props.remainingQuestions[0].correct_answer),
      );
    }
  };

  return { checkAnswer, handleNextQuestion };
};
