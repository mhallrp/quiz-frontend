import { useState, useEffect } from 'react';

export const useTriviaQuestions = (categoryId) => {
    const [questions, setQuestions] = useState([]);
    const [apiStatus, setApiStatus] = useState(null);
    const fetchQuestions = async () => {
        try {
            const url = `https://request.matt-hall.dev/quiz/trivia?category=${categoryId}`;
            const response = await fetch(url,{ 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                const response = await fetch(`https://request.matt-hall.dev/quiz/categories`,{ 
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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