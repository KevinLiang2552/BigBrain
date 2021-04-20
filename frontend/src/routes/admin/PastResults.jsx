import React, { useState, useEffect } from 'react';
import API from '../../api/api.js';
import { useParams } from 'react-router';
import { Button, Grid } from '@material-ui/core';

export const PastResultsPage = () => {
  const api = new API('http://localhost:5005');
  const { id } = useParams();

  const [oldSessionResults, setOldSessionResults] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(async () => {
    setOldSessionDetails(id);
  }, []);

  const setOldSessionDetails = async (quizId) => {
    const quizDetailsRes = await api.authorisedRequest(
      'GET',
      `admin/quiz/${quizId}`,
    );
    if (quizDetailsRes.status === 200) {
      const prevSessions = [];
      for (const session of quizDetailsRes.data.oldSessions) {
        const sessionResultRes = await api.authorisedRequest(
          'GET',
          `admin/session/${session}/results`,
        );
        if (sessionResultRes.status === 200) {
          prevSessions.push(sessionResultRes.data);
        } else {
          console.log(sessionResultRes.data.error);
        }
      }
      setOldSessionResults(prevSessions);
      setQuizQuestions(quizDetailsRes.data.questions);
    } else {
      console.log(quizDetailsRes.data.error);
    }
  };

  const handleShowMeSomeResults = () => {
    console.log(oldSessionResults);
    console.log(quizQuestions);
  };

  return (
    <Grid container>
      <Grid item>
        <Button onClick={handleShowMeSomeResults}>show me da deets</Button>
      </Grid>
    </Grid>
  );
};
