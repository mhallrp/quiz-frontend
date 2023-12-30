import React, { useState, useEffect } from 'react';
import Styles from './styles.module.css';
import Login from './Components/Login';
import Quiz from './Components/Quiz';
import useAuth from './Model/useAuth';
import { useTriviaQuestions, useQuizCategories } from './Model/CustomHooks';
import NavBar from './Components/NavBar';

export default function App() {
    const { sessionCheck } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentCategories, setCurrentCategories] = useState(null);
    const [remainingQuestions, setRemainingQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('9');
    const { questions: triviaQuestions, fetchQuestions, status } = useTriviaQuestions(selectedCategory);
    const triviaCategories = useQuizCategories();
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [contentOpacity, setContentOpacity] = useState(1);
    const [showQuiz, setShowQuiz] = useState(false);
    const [userData, setUserData] = useState('')

    const checkSessionStatus = async () => {
        try {
            const result = await sessionCheck();
            if (result.status === 200) {
                setUserData(result.data.username + " " + result.data.score);
                setIsLoggedIn(true);
            }
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
            setIsLoading(false);
        }
    }, [triviaCategories, triviaQuestions, status]);

    useEffect(() => {
        if (isLoggedIn) {
            setContentOpacity(0);
            setTimeout(() => {
                setShowQuiz(true); 
                setContentOpacity(1);
            }, 300); 
        } else {
            setShowQuiz(false);
        }
    }, [isLoggedIn]);

    const renderContent = () => {
        if (isLoading) {
            return <div className={Styles.spinner}></div>;
        } else if (showQuiz) {
            return (
                <Quiz 
                    setScore={ setScore }
                    score={ score }
                    setRemainingQuestions={ setRemainingQuestions }
                    setSelectedCategory={ setSelectedCategory }
                    remainingQuestions={ remainingQuestions }
                    fetchQuestions={ fetchQuestions }
                    triviaQuestions={ triviaQuestions }
                    currentCategories={ currentCategories }
                    loggedIn={ setIsLoggedIn }
                    setUserData={ setUserData }
                />
            );
        } else {
            return( 
                <Login 
                    loggedIn={ setIsLoggedIn }
                    setUserData={ setUserData }
                />
            )
        }
    };

    return (
        <>
            <NavBar 
                userData={ userData }
            />
            <div className={Styles.mainSection}>
                <div 
                    className={Styles.dataSection} 
                    style={{ 
                        opacity: contentOpacity, 
                        transition: 'opacity 300ms ease-in-out'
                    }}
                >
                    {renderContent()}
                </div>
            </div>
        </>
    );
}
