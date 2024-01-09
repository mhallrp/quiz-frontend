import React, { useState, useEffect } from 'react';
import './index.css';
import Login from './Components/Login';
import Quiz from './Components/Quiz';
import Categories from './Components/Categories';
import useAuth from './Model/authLogic';
import { useData } from './Model/dataLogic';
import NavBar from './Components/NavBar';

export default function App() {
  const { sessionCheck, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('9');
  const [state, setState] = useState('loading');
  const [opacity, setOpacity] = useState(1);
  const { fetchQuestions } = useData(selectedCategory);
  const [userData, setUserData] = useState({
    name: undefined,
    score: undefined,
  });
  
  const checkSessionStatus = async () => {
    try {
      const result = await sessionCheck();
      if (result.status === 200) {
        setUserData({ name: result.data.username, score: result.data.score });
        setState('quiz');
        return
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

  const handleLogout = async () => {
    await logout();
    fetchQuestions();
    changeState('login', { name: undefined, score: undefined });
  };

  useEffect(() => {
    checkSessionStatus();
  }, []);

  const renderContent = () => {
    switch (state) {
      case 'quiz':
        return (
          <Quiz
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 'login':
        return <Login changeState={changeState} />;
      default:
        return (
          <div className="spinner h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-solid border-black10 border-t-spinnerYellow"></div>
        );
    }
  };

  return (
    <div className="backdrop-blu-sm flex min-h-screen flex-col items-center bg-main font-sans">
      <NavBar
        userData={userData}
        opacity={opacity}
        handleLogout={handleLogout}
      />
      <div
        className="mx-2 my-4 flex flex-col items-center justify-center sm:mx-20 sm:my-8"
        style={{
          opacity: opacity,
          transition: 'opacity 300ms ease-in-out',
        }}>
        {state === 'quiz' && (
          <Categories setSelectedCategory={setSelectedCategory} />
        )}
        <div className="flex flex-col items-center justify-center rounded-25px border-b border-l-greylight bg-white p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
