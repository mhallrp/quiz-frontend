import React, { useState, useEffect } from 'react';
import './index.css';
import Login from './Components/Login';
import Quiz from './Components/Quiz';
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
  const [contentOpacity, setContentOpacity] = useState(1);
  const [userData, setUserData] = useState('');
  const [dataOpacity, setDataOpacity] = useState(0);

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


  const changeState = (view, data) =>{
    setContentOpacity(0);
    setDataOpacity(0)
    setTimeout(() => {
      setState(view);
      setUserData(data);
      setContentOpacity(1);
      setDataOpacity(1);
    }, 300);
  }

  useEffect(() => {
    if (status === 500) {
      alert(
        "Whoops, looks like there's a network error :/ \n Try refreshing in a moment",
      );
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
            setUserData={setUserData}
            setDataOpacity={setDataOpacity}
          />
        );
      case 'login':
        return <Login changeState={changeState} setUserData={setUserData} />;
      default:
        return <div className="spinner"></div>;
    }
  };

  return (
    <div className="backdrop-blu-sm flex h-screen flex-col bg-main font-sans">
      <NavBar userData={userData} dataOpacity={dataOpacity} />
      <div className="flex h-full items-center justify-center">
        <div
          className="dataSection "
          style={{
            opacity: contentOpacity,
            transition: 'opacity 300ms ease-in-out',
          }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}


