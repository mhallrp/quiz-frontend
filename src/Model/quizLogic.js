export const useQuiz = (
  selected,
  setSelected,
  answers,
  score,
  setScore,
  setCorrect,
  setRemainingQuestions,
  remainingQuestions,
  fetchQuestions,
  triviaQuestions,
) => {
  const handleNextQuestion = () => {
    setCorrect(undefined);
    setSelected(undefined);
    if (remainingQuestions.length !== 1) {
      setRemainingQuestions((prevQuestions) => prevQuestions.slice(1));
    } else {
      const totalQuestions = triviaQuestions.length;
      alert(`Your score is ${score}/${totalQuestions}`);
      fetchQuestions();
      setScore(0);
    }
  };

  const checkAnswer = () => {
    if (selected != null) {
      if (answers[selected] === remainingQuestions[0].correct_answer) {
        setScore((prevScore) => prevScore + 1);
      }
      setCorrect(answers.indexOf(remainingQuestions[0].correct_answer));
    }
  };

  return { checkAnswer, handleNextQuestion };
};
