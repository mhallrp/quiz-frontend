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
    const triviaCategories = useQuizCategories()

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

    return (
        <div className={ Styles.mainSection }>
            <div className={ Styles.dataSection }>
                { isLoggedIn ? <Quiz loggedIn={ setIsLoggedIn } /> : <Login currentCategories={ currentCategories } loggedIn={ setIsLoggedIn } /> }
            </div>
        </div>
    );
};

export default App;