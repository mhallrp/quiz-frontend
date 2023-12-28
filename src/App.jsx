import Styles from './styles.module.css'
import Login from './Components/Login'
import Quiz from './Components/Quiz'
import { useState, useEffect } from 'react'
import useAuth from './Model/useAuth';

const App = () => {
    const { sessionCheck } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const checkSession = async () => {
            try {
                const status = await sessionCheck();
                setIsLoading(false);
                if (status !== 200) {
                    setIsLoggedIn(false);
                } else {
                    setIsLoading(true)
                    setIsLoggedIn(true);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        checkSession();
    }, [sessionCheck]);

    return (
        <div className={ Styles.mainSection } style={{ opacity: isLoading ? 0 : 1}}>
            <div className={ Styles.dataSection }>
                { isLoggedIn ? <Quiz isLoading={ setIsLoading } loggedIn={ setIsLoggedIn } /> : <Login isLoading={ setIsLoading } loggedIn={ setIsLoggedIn } /> }
            </div>
        </div>
    );
};

export default App;

// { isLoading
//     ?
//         <div className={ Styles.spinner }></div>
//     :
// }