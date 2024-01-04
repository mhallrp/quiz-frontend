import React, { useState, useEffect } from 'react';
import './index.css';
import Login from './Components/Login';
import Quiz from './Components/Quiz';
import useAuth from './Model/useAuth';
import { useTriviaQuestions, useQuizCategories } from './Model/CustomHooks';
import NavBar from './Components/NavBar';

export default function App() {
  const { sessionCheck } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState([false, '']);
  const [currentCategories, setCurrentCategories] = useState(null);
  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('9');
  const triviaCategories = useQuizCategories();
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userData, setUserData] = useState('');
  const [dataOpacity, setDataOpacity] = useState(0);
  const {
    questions: triviaQuestions,
    fetchQuestions,
    status,
  } = useTriviaQuestions(selectedCategory);

  const checkSessionStatus = async () => {
      try {
          const result = await sessionCheck();
          if (result.status === 200) {
              setUserData(result.data.username + " " + result.data.score);
              setIsLoggedIn([true,'']);
              setIsLoading(false)
          }
      } catch (error) {
          setIsLoggedIn([false,'']);
          setIsLoading(false)
      }
  };

  useEffect(() => {
      checkSessionStatus();
  }, []);

  useEffect(() => {
      if (status === 500) {
          alert("Whoops, looks like there's a network error :/ \n Try refreshing in a moment");
      } else if (triviaCategories && triviaQuestions.length > 0) {
          setCurrentCategories(triviaCategories);
          setRemainingQuestions(triviaQuestions);
          setScore(0);
          // setIsLoading(false);
      }
  }, [triviaCategories, triviaQuestions, status]);

  useEffect(() => {
      setContentOpacity(0);
      setTimeout(() => {
      if (isLoggedIn[0]) {
          setShowQuiz(true);
          setContentOpacity(1);
          setDataOpacity(1)
      } else {
          setShowQuiz(false);
          setContentOpacity(1);
      }}, 300);
  }, [isLoggedIn[0]]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="spinner"></div>;
    } else if (showQuiz) {
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
          setIsLoggedIn={setIsLoggedIn}
          setUserData={setUserData}
          setDataOpacity={setDataOpacity}
        />
      );
    } else {
      return <Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />;
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
