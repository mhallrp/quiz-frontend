import { useState, useEffect } from 'react';
import Styles from './styles.module.css';
import Login from './Components/Login';
import Quiz from './Components/Quiz';
import useAuth from './Model/useAuth';
import { useTriviaQuestions, useQuizCategories } from './Model/CustomHooks';

export default function App () {

    const { sessionCheck } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentCategories, setCurrentCategories] = useState(null);
    const [remainingQuestions, setRemainingQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('9');
    const { questions: triviaQuestions, fetchQuestions, status } = useTriviaQuestions(selectedCategory);
    const triviaCategories = useQuizCategories();

    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

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
    }, [sessionCheck]);

    useEffect(() => {
        console.log("this is the status " + status)
        if (status === 500){
            setTimeout(fetchQuestions(), 5000)
        }
        if (triviaCategories && triviaQuestions.length > 0) {
            setCurrentCategories(triviaCategories);
            setRemainingQuestions(triviaQuestions);
            setScore(0);
            setIsLoading(false);
        }
    }, [triviaCategories, triviaQuestions, status]);

    const renderContent = () => {
        if (isLoading) {
            return <div className={ Styles.spinner }></div>;
        } else if (isLoggedIn) {
            return <Quiz 
                        setScore={ setScore }
                        score={ score } 
                        setRemainingQuestions={ setRemainingQuestions }
                        setSelectedCategory={ setSelectedCategory } 
                        remainingQuestions={ remainingQuestions } 
                        fetchQuestions={ fetchQuestions }
                        triviaQuestions={ triviaQuestions } 
                        currentCategories={ currentCategories } 
                        loggedIn={ setIsLoggedIn } 
                    />;
        } else {
            return <Login loggedIn={ setIsLoggedIn } />;
        }
    };

    return (
        <div className={ Styles.mainSection }>
            <div className={ Styles.dataSection }>
                { renderContent() }
            </div>
        </div>
    );
};
