import { useState, useEffect } from "react";
import AnswerCard from "../AnswerCard";
import { ShuffleArray, decodeHtmlEntities } from "../../Model/utils";
import { useQuiz } from "../../Model/quizLogic";
import { useData } from "../../Model/dataLogic";

const Quiz = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(undefined);
  const [correct, setCorrect] = useState(undefined);
  const [remainingQuestions, setRemainingQuestions] = useState([]);

  const {
    questions: triviaQuestions,
    fetchQuestions,
    status,
  } = useData(props.selectedCategory);

  const { checkAnswer, handleNextQuestion } = useQuiz(
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
  );

  useEffect(() => {
    if (remainingQuestions.length > 0) {
      const current = remainingQuestions[0];
      setCurrentQuestion(current);
      const combinedAnswers = [
        current.correct_answer,
        ...current.incorrect_answers,
      ];
      const shuffledAnswers = ShuffleArray(combinedAnswers);
      setAnswers(shuffledAnswers);
    }
  }, [remainingQuestions]);

  useEffect(() => {
    if (status === 500) {
      alert("This API inlcudes rate limiting:/ \n Try refreshing in a moment");
    } else if (triviaQuestions.length > 0) {
      setRemainingQuestions(triviaQuestions);
      setSelected(undefined);
      setCorrect(undefined);
    }
  }, [triviaQuestions, status]);

  return (
    <>
      {currentQuestion && triviaQuestions.length > 0 ? (
        <>
          <div className="flex w-full items-center gap-4">
            <h2 className="text-left font-oswald text-2xl">
              Q
              {Array.isArray(triviaQuestions)
                ? triviaQuestions.length - remainingQuestions.length + 1
                : 0}
              :{" "}
              {currentQuestion && decodeHtmlEntities(currentQuestion.question)}
            </h2>
            <p className="ml-auto pt-1 text-base text-greytext">
              Score
              <span className="ml-3 rounded bg-darkYellow px-2 py-1 leading-4 text-black">
                {score}
              </span>
            </p>
          </div>
          <div className="mt-5 flex w-full flex-col flex-nowrap content-center justify-center gap-4 sm:flex-row sm:flex-wrap">
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
                  ? "bg-darkYellow"
                  : "bg-greyanswer"
              } ${
                selected !== undefined && correct === undefined
                  ? "text-black"
                  : "text-greyanswerb"
              } h-11 rounded  px-6`}
              disabled={
                correct != null ? true : selected != null ? false : true
              }
              onClick={() => checkAnswer()}>
              Check Answer
            </button>
            <button
              className={`${
                correct !== undefined ? "bg-darkYellow" : "bg-greyanswer"
              } ${
                correct !== undefined ? "text-black" : "text-greyanswerb"
              } h-11 rounded px-6`}
              disabled={correct != null ? false : true}
              onClick={handleNextQuestion}>
              Next Question
            </button>
          </div>
        </>
      ) : (
        <div className="spinner h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-solid border-black10 border-t-spinnerYellow"></div>
      )}
    </>
  );
};

export default Quiz;
