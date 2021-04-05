import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import API from '../../api/api.js';

export const EditQuestionPage = () => {
  const api = new API('http://localhost:5005');

  const { id } = useParams();

  const emptyDetails = {
    questions: [{}],
    createdAt: '',
    name: '',
    thumbnail: '',
    owner: '',
    active: null,
    oldSessions: [],
  };

  const [details, setDetails] = useState(emptyDetails);

  useEffect(async () => {
    setQuizDetails(id);
  }, []);

  const setQuizDetails = async (quizId) => {
    const quizDetailsRes = await api.authorisedRequest(
      'GET',
      `admin/quiz/${quizId}`,
    );
    if (quizDetailsRes.status === 200) {
      setDetails(quizDetailsRes.data);
    } else {
      console.log(quizDetailsRes.data.error);
    }
  };

  console.log(details);
  return (
    <div>
      <div>{details.questions.length}</div>
    </div>
  );
};
