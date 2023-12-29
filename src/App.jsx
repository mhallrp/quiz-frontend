import React, { useState, useEffect, useRef } from 'react';
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
    const [isLoaded, setIsLoaded] = useState(false)

    const contentRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ width: 'auto', height: 'auto' });

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
            setIsLoading(false);
        }
    }, [triviaCategories, triviaQuestions, status]);

    // Effect to measure and set the size of the content container
    useEffect(() => {
        if (isLoaded){
        if (contentRef.current) {
            const { width, height } = contentRef.current.getBoundingClientRect();
            setContainerSize({ width, height });
        }
    }
    }, [isLoggedIn, isLoading]); // Dependencies are isLoggedIn and isLoading

    const renderContent = () => {
        if (isLoading) {
            return <div className={Styles.spinner}></div>;
        } else if (isLoggedIn) {
            return <Quiz 
                        setIsLoaded={setIsLoaded}
                        setScore={setScore}
                        score={score}
                        setRemainingQuestions={setRemainingQuestions}
                        setSelectedCategory={setSelectedCategory}
                        remainingQuestions={remainingQuestions}
                        fetchQuestions={fetchQuestions}
                        triviaQuestions={triviaQuestions}
                        currentCategories={currentCategories}
                        loggedIn={setIsLoggedIn}
                    />;
        } else {
            return <Login loggedIn={setIsLoggedIn} />;
        }
    };

    return (
        <>
        <NavBar />
        <div className={Styles.mainSection}>
            <div 
                className={Styles.dataSection} 
                style={{ width: containerSize.width, height: containerSize.height, transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out' }}
                
            >
                <div ref={contentRef}>
                    {renderContent()}
                </div>
            </div>
        </div>
        </>
    );
}
