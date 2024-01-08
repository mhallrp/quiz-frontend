import { useState, useEffect } from 'react';
import AnswerCard from '../AnswerCard';
import { ShuffleArray, decodeHtmlEntities } from '../../Model/utils';

export default function Quiz(props) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [correct, setCorrect] = useState(undefined);

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
    setCorrect(undefined);
    setSelected(undefined);
    if (props.remainingQuestions.length !== 1) {
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
      if (answers[selected] === props.remainingQuestions[0].correct_answer) {
        props.setScore((prevScore) => prevScore + 1);
      }
      setCorrect(answers.indexOf(props.remainingQuestions[0].correct_answer));
    }
  };

  return (
    <>
      {currentQuestion && (
        <>
          <div className="flex w-full items-center gap-4">
            <h2 className="text-left font-oswald text-2xl">
              Q
              {Array.isArray(props.triviaQuestions)
                ? props.triviaQuestions.length -
                  props.remainingQuestions.length +
                  1
                : 0}
              :{' '}
              {currentQuestion && decodeHtmlEntities(currentQuestion.question)}
            </h2>
            <p className="ml-auto pt-1 text-base text-greytext">
              Score
              <span className="ml-3 rounded bg-darkYellow px-2 py-1 leading-4 text-black">
                {props.score}
              </span>
            </p>
          </div>
          <div className="mt-5 flex flex-wrap content-center justify-center gap-4">
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
          <div className="mt-4 flex flex-wrap content-center justify-center gap-4">
            <button
              className={`${
                selected !== undefined && correct === undefined
                  ? 'bg-darkYellow'
                  : 'bg-greyanswer'
              } ${
                selected !== undefined && correct === undefined
                  ? 'text-black'
                  : 'text-greyanswerb'
              } h-11 rounded  px-6`}
              disabled={
                correct != null ? true : selected != null ? false : true
              }
              onClick={() => checkAnswer()}>
              Check Answer
            </button>
            <button
              className={`${
                correct !== undefined ? 'bg-darkYellow' : 'bg-greyanswer'
              } ${
                correct !== undefined ? 'text-black' : 'text-greyanswerb'
              } h-11 rounded px-6`}
              disabled={correct != null ? false : true}
              onClick={handleNextQuestion}>
              Next Question
            </button>
          </div>
        </>
      )}
    </>
  );
}
