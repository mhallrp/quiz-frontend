import { useState, useEffect } from 'react';
import AnswerCard from '../AnswerCard';
import { ShuffleArray, decodeHtmlEntities } from '../../Model/utils';
import useAuth from '../../Model/useAuth';

export default function Quiz(props) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState();
  const [correct, setCorrect] = useState();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    props.fetchQuestions();
    props.changeState('login', undefined);
  };

  useEffect(() => {
    if (props.remainingQuestions.length > 0) {
      const current = props.remainingQuestions[0];
      setCurrentQuestion(current);
      const combinedAnswers = [
        current.correct_answer,
        ...current.incorrect_answers,
      ];
      const shuffledAnswers = ShuffleArray(combinedAnswers);
      setAnswers(shuffledAnswers);
    }
  }, [props.remainingQuestions]);

  const handleNextQuestion = () => {
    setCorrect();
    setSelected();
    if (props.remainingQuestions.length != 1) {
      props.setRemainingQuestions((prevQuestions) => prevQuestions.slice(1));
    } else {
      const totalQuestions = props.triviaQuestions.length;
      alert(`Your score is ${props.score}/${totalQuestions}`);
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    props.fetchQuestions();
    props.setScore(0);
  };

  const checkAnswer = () => {
    if (selected != null) {
      if (answers[selected] == props.remainingQuestions[0].correct_answer) {
        props.setScore((prevScore) => prevScore + 1);
      }
      setCorrect(answers.indexOf(props.remainingQuestions[0].correct_answer));
    }
  };

  return (
    <>
      {currentQuestion && (
        <>
          <h2 className="mt-5 w-full text-center">
            Q
            {Array.isArray(props.triviaQuestions)
              ? props.triviaQuestions.length -
                props.remainingQuestions.length +
                1
              : 0}
            : {currentQuestion && decodeHtmlEntities(currentQuestion.question)}
          </h2>
          <div className="mt-5 flex flex-wrap content-center">
            {answers.map((e, index) => (
              <AnswerCard
                selected={selected == index ? true : false}
                correct={correct == index ? true : false}
                key={index}
                text={decodeHtmlEntities(e)}
                onClick={() => {
                  correct == null && selected != index
                    ? setSelected(index)
                    : correct == null && setSelected();
                }}
              />
            ))}
          </div>
          <div className="mb-12 mt-5 flex content-center gap-6">
            <button
              disabled={
                correct != null ? true : selected != null ? false : true
              }
              onClick={() => checkAnswer()}>
              Check Answer
            </button>
            <button
              disabled={correct != null ? false : true}
              onClick={handleNextQuestion}>
              Next Question
            </button>
            <p>
              Score {props.score}/
              {Array.isArray(props.triviaQuestions)
                ? props.triviaQuestions.length
                : 0}
            </p>
            {props.currentCategories && (
              <select
                onChange={(e) => props.setSelectedCategory(e.target.value)}>
                {props.currentCategories.map((e, index) => {
                  return (
                    <option key={index} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            )}
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
        </>
      )}
    </>
  );
}
