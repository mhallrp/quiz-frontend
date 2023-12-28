import Styles from './styles.module.css'
import Login from './Components/Login'
import Quiz from './Components/Quiz'
import { useState, useEffect } from 'react'
import useAuth from './Model/useAuth';
import { useTriviaQuestions, useQuizCategories } from './Model/CustomHooks';

const App = () => {

    const { sessionCheck } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentCategories, setCurrentCategories] = useState(null);
    const [remainingQuestions, setRemainingQuestions] = useState([]);
    const triviaCategories = useQuizCategories()
    const { questions: triviaQuestions, fetchQuestions } = useTriviaQuestions(selectedCategory);
    const [selectedCategory, setSelectedCategory] = useState('9')
    

    useEffect(() => {
        const checkSession = async () => {
            try {
                const status = await sessionCheck();
                if (status !== 200) {
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        checkSession();
    }, [sessionCheck]);

    useEffect(() =>{
        setCurrentCategories(triviaCategories)
    }, [triviaCategories])

    useEffect(() => {
        setScore(0)
        setRemainingQuestions(triviaQuestions);
    }, [triviaQuestions]);

    return (
        <div className={ Styles.mainSection }>
            <div className={ Styles.dataSection }>
                { isLoggedIn ? <Quiz setRemainingQuestions={setRemainingQuestions}setSelectedCategory={setSelectedCategory} remainingQuestions={ remainingQuestions } fetchQuestions={ fetchQuestions }triviaQuestions={ triviaQuestions } currentCategories={ currentCategories } loggedIn={ setIsLoggedIn } /> : <Login loggedIn={ setIsLoggedIn } /> }
            </div>
        </div>
    );
};

export default App;