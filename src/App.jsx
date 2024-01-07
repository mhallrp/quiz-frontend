import React, { useState, useEffect } from 'react';
import './index.css';
import Login from './Components/Login';
import Quiz from './Components/Quiz';
import Categories from './Components/Categories';
import useAuth from './Model/useAuth';
import { useTriviaQuestions, useQuizCategories } from './Model/CustomHooks';
import NavBar from './Components/NavBar';

export default function App() {
  const { sessionCheck } = useAuth();
  const [currentCategories, setCurrentCategories] = useState(null);
  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('9');
  const triviaCategories = useQuizCategories();
  const [score, setScore] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [userData, setUserData] = useState('');
  const [state, setState] = useState('loading');

  const {
    questions: triviaQuestions,
    fetchQuestions,
    status,
  } = useTriviaQuestions(selectedCategory);

  const checkSessionStatus = async () => {
    try {
      const result = await sessionCheck();
      if (result.status === 200) {
        setUserData(result.data.username + ' ' + result.data.score);
        setState('quiz');
      } else {
        setState('login');
      }
    } catch (error) {
      setState('login');
    }
  };

  const changeState = (view, data) => {
    setOpacity(0);
    setTimeout(() => {
      setState(view);
      setUserData(data);
      setOpacity(1);
    }, 300);
  };

  useEffect(() => {
    if (status === 500) {
      alert('This API inlcudes rate limiting:/ \n Try refreshing in a moment');
    } else if (triviaCategories && triviaQuestions.length > 0) {
      setCurrentCategories(triviaCategories);
      setRemainingQuestions(triviaQuestions);
      setScore(0);
      checkSessionStatus();
    }
  }, [triviaCategories, triviaQuestions, status]);

  const renderContent = () => {
    switch (state) {
      case 'quiz':
        return (
          <Quiz
            setScore={setScore}
            score={score}
            setRemainingQuestions={setRemainingQuestions}
            setSelectedCategory={setSelectedCategory}
            remainingQuestions={remainingQuestions}
            fetchQuestions={fetchQuestions}
            triviaQuestions={triviaQuestions}
            currentCategories={currentCategories}
            changeState={changeState}
          />
        );
      case 'login':
        return <Login changeState={changeState} />;
      default:
        return (
          <div className="spinner border-black10 border-t-spinnerYellow h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-solid"></div>
        );
    }
  };

  return (
    <div className="backdrop-blu-sm flex min-h-screen flex-col items-center bg-main font-sans">
      <NavBar userData={userData} opacity={opacity} />
      <div className="mx-2 mt-8 flex flex-col items-center justify-center sm:mx-20">
        {state === 'quiz' && <Categories />}
        <div
          className="rounded-25px border-l-greylight  flex w-auto flex-col items-center justify-center overflow-auto border-b bg-white p-6"
          style={{
            opacity: opacity,
            transition: 'opacity 300ms ease-in-out',
          }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
