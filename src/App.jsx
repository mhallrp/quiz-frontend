import Quiz from './Pages/Quiz';
import Login from './Pages/Login';
import Unknown from './Pages/Unknown'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login /> }/>
                <Route path= "/quiz" element={<Quiz />}/>
                <Route path="*" element={ <Unknown /> }/>
            </Routes>
        </ BrowserRouter>
    );
};

export default App;
