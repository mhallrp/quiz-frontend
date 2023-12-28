import Styles from './styles.module.css'
import Login from './Components/Login'
import Quiz from './Components/Quiz'
import { useState, useEffect } from 'react'
import useAuth from './Model/useAuth';

const App = () => {
    const { sessionCheck } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const status = await sessionCheck();
                console.log(status)
                if (status !== 200) {
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Error checking session:', error);
                setIsLoggedIn(false);
            }
        };
        checkSession();
    }, [sessionCheck]);

    return (
        <div className={Styles.mainSection}>
            <div className={Styles.loginSection}>
                { isLoggedIn ? <Quiz /> : <Login /> }
            </div>
        </div>
    );
};

export default App;
