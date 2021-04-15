import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router';
import { EditInput } from '../../components/FormInputs.jsx';
import { emptyQuestion } from '../../helpers/emptyTypes.js';
import API from '../../api/api.js';

export const EditQuestionPage = () => {
  const api = new API('http://localhost:5005');
  const { id, questionID } = useParams();

  const [questionDetails, setQuestionDetails] = useState(emptyQuestion);
  const [questionList, setQuestionList] = useState([]);

  const setQuestions = async () => {
    const quizDetailsRes = await api.authorisedRequest(
      'GET',
      `admin/quiz/${id}`,
    );
    if (quizDetailsRes.status === 200) {
      setQuestionList(quizDetailsRes.data.questions);
      setQuestionDetails(quizDetailsRes.data.questions[questionID]);
    } else {
      console.log(quizDetailsRes.data.error);
    }
  };

  useEffect(() => {
    setQuestions();
  }, []);

  const handleQuestionUpdate = () => {
    console.log(questionList);
    console.log(questionDetails);
    console.log('rawr');
  };

  return (
    <>
      <Grid container>
        <Grid item>
          <EditInput
            type="Question"
            value={questionDetails.question}
            handleUpdate={handleQuestionUpdate}
          />
        </Grid>
      </Grid>
    </>
  );
};
