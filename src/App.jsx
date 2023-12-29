import React, { useState, useEffect } from 'react';
import Styles from './styles.module.css';
import Login from './Components/Login';
import Quiz from './Components/Quiz';
import useAuth from './Model/useAuth';
import { useTriviaQuestions, useQuizCategories } from './Model/CustomHooks';
import NavBar from './Components/NavBar';
import { Transition } from 'react-transition-group';

export default function App() {
    const { sessionCheck } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentCategories, setCurrentCategories] = useState(null);
    const [remainingQuestions, setRemainingQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('9');
    const { questions: triviaQuestions, fetchQuestions, status } = useTriviaQuestions(selectedCategory);
    const triviaCategories = useQuizCategories();
    const [score, setScore] = useState(0);

    const duration = 300; // Duration of the transition

    // Styles for entering and exiting transitions
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    };

    const transitionStyles = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:   { opacity: 0 },
    };

    const checkSessionStatus = async () => {
        try {
            const status = await sessionCheck();
            setIsLoggedIn(status === 200);
        } catch (error) {
            setIsLoggedIn(false);
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
        }
    }, [triviaCategories, triviaQuestions, status]);

    return (
        <>
            <NavBar />
            <div className={Styles.mainSection}>
                <div className={Styles.dataSection}>
                    <Transition in={isLoggedIn} timeout={duration}>
                        {state => (
                            <div style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}>
                                {isLoggedIn
                                    ? <Quiz 
                                        setScore={setScore}
                                        score={score}
                                        setRemainingQuestions={setRemainingQuestions}
                                        setSelectedCategory={setSelectedCategory}
                                        remainingQuestions={remainingQuestions}
                                        fetchQuestions={fetchQuestions}
                                        triviaQuestions={triviaQuestions}
                                        currentCategories={currentCategories}
                                        loggedIn={setIsLoggedIn}
                                      />
                                    : <Login loggedIn={setIsLoggedIn} />
                                }
                            </div>
                        )}
                    </Transition>
                </div>
            </div>
        </>
    );
}
