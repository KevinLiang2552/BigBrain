import React, { useState, useEffect } from 'react';
import API from '../../api/api.js';
import { emptyQuizResults } from '../../helpers/emptyTypes.js';
import { useParams } from 'react-router';
import { Box, Button, Grid } from '@material-ui/core';
import { ResultsTopPlayerTable } from '../../components/pastResults/resultsTopPlayerTable.jsx';
import { ResultsPercentCorrectGraph } from '../../components/pastResults/resultsPercentCorrectGraph.jsx';
import styles from '../../styles/pastResults.module.css';

export const PastResultsPage = () => {
  const api = new API('http://localhost:5005');
  const { id, sessionID } = useParams();

  const [oldSessionResults, setOldSessionResults] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currSessionResults, setCurrSessionResults] = useState(
    emptyQuizResults,
  );

  useEffect(async () => {
    setOldSessionDetails();
  }, []);

  const setOldSessionDetails = async () => {
    const quizDetailsRes = await api.authorisedRequest(
      'GET',
      `admin/quiz/${id}`,
    );
    if (quizDetailsRes.status === 200) {
      const prevSessions = [];
      for (const session of quizDetailsRes.data.oldSessions) {
        const sessionResultRes = await api.authorisedRequest(
          'GET',
          `admin/session/${session}/results`,
        );
        if (sessionResultRes.status === 200) {
          prevSessions.push({ ...sessionResultRes.data, sessionID: session });
        } else {
          console.log(sessionResultRes.data.error);
        }
      }
      setOldSessionResults(prevSessions);
      setQuizQuestions(quizDetailsRes.data.questions);

      if (sessionID === undefined) {
        setCurrSessionResults({ ...prevSessions[0], id: 0 });
      } else {
        const currSession = prevSessions.find(
          (session) => session.sessionID === sessionID,
        );
        setCurrSessionResults(currSession);
      }
    } else {
      console.log(quizDetailsRes.data.error);
    }
  };

  const handleShowMeSomeResults = () => {
    console.log(oldSessionResults);
    console.log(quizQuestions);
    console.log(currSessionResults);
  };

  const prevSession = () => {
    setCurrSessionResults({
      ...oldSessionResults[currSessionResults.id - 1],
      id: currSessionResults.id - 1,
    });
  };

  const nextSession = () => {
    setCurrSessionResults({
      ...oldSessionResults[currSessionResults.id + 1],
      id: currSessionResults.id + 1,
    });
  };

  return (
    <Box textAlign="center">
      <Grid container className={styles.resultsContainer}>
        <Grid item md={12} xs={12}>
          <ResultsTopPlayerTable
            results={currSessionResults.results}
            questionDetails={quizQuestions}
          />
        </Grid>
        <Grid item></Grid>
      </Grid>
      <ResultsPercentCorrectGraph
        results={currSessionResults.results}
        questionDetails={quizQuestions}
      />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end">
        <Grid item md={2} xs={4}>
          {currSessionResults.id !== 0 ? (
            <Button onClick={prevSession}>Go back</Button>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item md={4} xs={4}>
          <Button onClick={handleShowMeSomeResults}>show me da deets</Button>
        </Grid>
        <Grid item md={2} xs={4}>
          {currSessionResults.id !== oldSessionResults.length - 1 ? (
            <Button onClick={nextSession}>Go forward</Button>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
