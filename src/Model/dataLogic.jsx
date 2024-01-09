import { useState, useEffect } from 'react';
const apiKey = process.env.REACT_APP_API_KEY;

export const useTriviaQuestions = (categoryId) => {
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState(null);
  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `https://request.matt-hall.dev/quiz/trivia?category=${categoryId}`,
        {
          headers: {
            'X-API-Key': apiKey,
          },
        },
      );
      const data = await response.json();
      setStatus(200);
      setQuestions(data);
    } catch (error) {
      setStatus(500);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [categoryId]);
  return { questions, fetchQuestions, status };
};

export const useData = () => {

  const getCategories = async () => {
    try {
      const response = await fetch(
        `https://request.matt-hall.dev/quiz/categories`,
        {
          headers: {
            'X-API-Key': apiKey,
          },
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error: ', error);
      return []
    }
  };

  return { getCategories }

};
