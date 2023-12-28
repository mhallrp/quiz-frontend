import Styles from './styles.module.css'
import Login from './Components/Login'
import Quiz from './Components/Quiz'
import { useState, useEffect } from 'react'
import useAuth from './Model/useAuth';

const App = () => {
    const { sessionCheck } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkSession = async () => {
            try {
                const status = await sessionCheck();
                if (status !== 200) {
                    setIsLoading(false);
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

    return (
        <div className={Styles.mainSection}>
            { isLoading
            ?
                <div className={ Styles.spinner }></div>
            :
            <div className={Styles.dataSection}>
                { isLoggedIn ? <Quiz isLoading={setIsLoading} loggedIn={ setIsLoggedIn } /> : <Login loggedIn={ setIsLoggedIn } /> }
            </div>
            }
        </div>
    );
};

export default App;
