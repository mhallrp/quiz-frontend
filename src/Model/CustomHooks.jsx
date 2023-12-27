import { useState, useEffect } from 'react';

export const useTriviaQuestions = (categoryId) => {
    const [questions, setQuestions] = useState([]);
    const [apiStatus, setApiStatus] = useState(null);
    const fetchQuestions = async () => {
        try {
            const url = `https://quiz-backend-production-ae82.up.railway.app/quiz/trivia?category=${categoryId}`;
            const response = await fetch(url,{ 
                credentials: 'include' 
            });
            const data = await response.json();
            setApiStatus(response.status);
            setQuestions(data);
        } catch (error) {
            setApiStatus(500)
        }
    };
    useEffect(() => {
        fetchQuestions();
    }, [categoryId]);
    return { questions, fetchQuestions, apiStatus };
};

export const useQuizCategories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const initializeCategories = async () => {
            try {
                const response = await fetch(`https://quiz-backend-production-ae82.up.railway.app/quiz/categories`,{ 
                    credentials: 'include' 
                });
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error: ", error);
            }
        };
        initializeCategories();
    }, []);
    return categories;
};