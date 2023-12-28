import { useState, useEffect } from 'react';
import { useTriviaQuestions, useQuizCategories } from '../../Model/CustomHooks';
import AnswerCard from '../../Components/AnswerCard';
import Styles from './styles.module.css'
import { ShuffleArray, decodeHtmlEntities } from '../../Model/utils'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Model/useAuth'

export default function Quiz () {

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentCategories, setCurrentCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('9')
    const [remainingQuestions, setRemainingQuestions] = useState([]);
    const [answers, setAnswers] = useState([])
    const [selected, setSelected] = useState();
    const [correct, setCorrect] = useState();
    const [score, setScore] = useState(0)
    const { questions: triviaQuestions, fetchQuestions, apiStatus } = useTriviaQuestions(selectedCategory);
    const triviaCategories = useQuizCategories()
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    useEffect(() => {
        setScore(0)
        switch(apiStatus){
            case 403:navigate('/');break
            case 500:alert("Too many requests");break
            default:setRemainingQuestions(triviaQuestions);
        }
    }, [triviaQuestions, apiStatus, navigate]);

    useEffect(() =>{
        setCurrentCategories(triviaCategories)
    }, [triviaCategories])

    useEffect(() => {
        if (remainingQuestions.length > 0) {
            const current = remainingQuestions[0];
            setCurrentQuestion(current);
            const combinedAnswers = [current.correct_answer, ...current.incorrect_answers];
            const shuffledAnswers = ShuffleArray(combinedAnswers);
            setAnswers(shuffledAnswers);
        }
    }, [remainingQuestions]);

    const handleNextQuestion = () => {
        setCorrect()
        setSelected()
        if ( remainingQuestions.length != 1 ){
        setRemainingQuestions(prevQuestions => prevQuestions.slice(1));
        } else {
            const totalQuestions = triviaQuestions.length;
            alert(`Your score is ${score}/${totalQuestions}`);
            resetQuiz();
        }
    };
    
    const resetQuiz = () => {
        fetchQuestions()
        setScore(0);
    };

    const checkAnswer = () => {
        if (selected != null){
            if (answers[selected] == remainingQuestions[0].correct_answer){
                setScore(prevScore => prevScore + 1)
            }
            setCorrect(answers.indexOf(remainingQuestions[0].correct_answer))
        }
    }

    return (
        <div className={ Styles.quizMain }>
            { currentQuestion && (
            <div>
                <h2 className={ Styles.questionTitle }>Q{Array.isArray(triviaQuestions) ? triviaQuestions.length - remainingQuestions.length + 1 : 0}: { currentQuestion && decodeHtmlEntities(currentQuestion.question) }</h2>
                <div className={ Styles.answerCards }>
                    { answers.map((e, index) => 
                        <AnswerCard selected={ selected == index ? true : false } correct={ correct == index ? true : false } key={index}  text={decodeHtmlEntities(e)}  onClick={ () => { correct == null && selected != index ? setSelected(index) : correct == null && setSelected() }}/>
                        ) 
                    }
                </div>
                <div className={ Styles.buttons }>
                    <button disabled={ correct != null ? true : selected != null ? false : true} onClick={ () => checkAnswer() }>Check Answer</button>
                    <button disabled={ correct != null ? false : true } onClick={ handleNextQuestion }>Next Question</button>
                    <p>Score { score }/{ Array.isArray(triviaQuestions) ? triviaQuestions.length : 0 }</p>
                {currentCategories && (
                    <select onChange={(e) => setSelectedCategory(e.target.value)}>
                        {
                        currentCategories.map((e,index) => {
                           return <option key={ index }value={ e.id }>{ e.name }</option>
                        })}
                    </select>
                )}  
                <button onClick={ () => handleLogout() }>Logout</button>
                </div>
            </div>
            )}
        </div>
    );
};