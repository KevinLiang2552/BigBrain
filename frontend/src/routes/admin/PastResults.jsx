import React, { useState, useEffect } from 'react';
import API from '../../api/api.js';
import { emptyQuizResults } from '../../helpers/emptyTypes.js';
import { useParams } from 'react-router';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import styles from '../../styles/pastResults.module.css';
import { ResultsTopPlayerTable } from '../../components/pastResults/resultsTopPlayerTable.jsx';
import { ResultsPercentCorrectGraph } from '../../components/pastResults/resultsPercentCorrectGraph.jsx';
import { ResultsAverageAnswerTimeGraph } from '../../components/pastResults/resultsAverageAnswerTimeGraph.jsx';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

// Results for all past sessions of a quiz
export const PastResultsPage = () => {
  const api = new API('http://localhost:5005');
  const { id, sessionID } = useParams();

  const [oldSessionResults, setOldSessionResults] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currSessionResults, setCurrSessionResults] = useState(
    emptyQuizResults,
  );

  const location = useLocation();
  const history = useHistory();

  useEffect(async () => {
    setOldSessionDetails();
  }, []);

  // Set the various data related to the session and quiz
  const setOldSessionDetails = async () => {
    // Grabbing all the previous sessionIDs and question details
    const quizDetailsRes = await api.authorisedRequest(
      'GET',
      `admin/quiz/${id}`,
    );
    if (quizDetailsRes.status === 200) {
      // Grabbing the data using the sessionIDs
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

      // If the url isn't given a particular sessionID, use the first one found.
      if (sessionID === undefined) {
        setCurrSessionResults({ ...prevSessions[0], id: 0 });
      } else {
        // If there is a particular sessionID parameter, find that and set it as the current session
        const currSession = prevSessions.find(
          (session) => session.sessionID === parseInt(sessionID),
        );
        // Set index so we can turn pages
        const currSessionIndex = prevSessions.findIndex(
          (session) => session.sessionID === parseInt(sessionID),
        );

        setCurrSessionResults({ ...currSession, id: currSessionIndex });
      }
    } else {
      console.log(quizDetailsRes.data.error);
    }
  };

  // Change the url to the current session id we are looking at.
  useEffect(() => {
    if (currSessionResults.sessionID === undefined) return;
    let path = location.pathname;
    if (sessionID !== undefined) {
      path = path.slice(0, -7);
    }
    path += `/${currSessionResults.sessionID}`;
    history.replace(path);
  }, [currSessionResults]);

  // Sets the data to the previous session
  const prevSession = () => {
    setCurrSessionResults({
      ...oldSessionResults[currSessionResults.id - 1],
      id: currSessionResults.id - 1,
    });
  };

  // Sets the data to the next session
  const nextSession = () => {
    setCurrSessionResults({
      ...oldSessionResults[currSessionResults.id + 1],
      id: currSessionResults.id + 1,
    });
  };

  // What the main content will display depending on if the found results are for the
  // session is valid/not
  const mainContent = () => {
    if (
      currSessionResults.results === undefined ||
      currSessionResults.results.length === 0
    ) {
      return (
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center">
          <Grid item md={12} xs={12}>
            {/* Some basic information about the current session */}
            <Typography variant="h5">Session Details</Typography>
            <Typography variant="subtitle1">
              Session ID: {currSessionResults.sessionID}
            </Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <Typography variant="h3">
              There was no active players for this quiz session.
            </Typography>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center">
          <Grid item md={2} xs={6}>
            {/* Some basic information about the current session */}
            <Typography variant="h5">Session Details</Typography>
            <Typography variant="subtitle1">
              Session ID: {currSessionResults.sessionID}
            </Typography>
            <Typography variant="subtitle1">
              Number of players: {currSessionResults.results.length}
            </Typography>
          </Grid>

          {/* Top 5 players table */}
          <Grid item md={4} xs={12} className={styles.top5PlayersWrapper}>
            <ResultsTopPlayerTable
              results={currSessionResults.results}
              questionDetails={quizQuestions}
            />
            <Box className={styles.resultScoreExplanation}>
              <Typography variant="h6">
                How the each question score is calculated
              </Typography>
              <Typography variant="subtitle">
                <ul>
                  <li>
                    The score of each question is calculated by the ratio of
                    time left by the amount of time given the result is rounded
                    to a whole number between 1 to 10.
                  </li>
                  <li>
                    This value is mutliplied by 0.05 giving you a maximum value
                    of 0.5 bonus points possible each question.
                  </li>
                  <li>
                    This value is added with the points given by the question
                    and then times by 100 to make you think the scores are worth
                    alot.
                  </li>
                </ul>
              </Typography>
            </Box>
          </Grid>

          {/* Graphs section */}
          <Grid item md={12} xs={12}>
            <Grid container>
              <Grid item md={6} xs={12}>
                {/* Percent Correct */}
                <ResultsPercentCorrectGraph
                  results={currSessionResults.results}
                  questionDetails={quizQuestions}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {/* Average time taken to answer */}
                <ResultsAverageAnswerTimeGraph
                  results={currSessionResults.results}
                  questionDetails={quizQuestions}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Box
      textAlign="center"
      display="flex"
      height="90vh"
      className={styles.resultsContainer}>
      <Grid container>
        {mainContent()}
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-end">
          {/* Navigation Button Section */}
          <Grid item md={2} xs={4}>
            {currSessionResults.id !== 0 ? (
              <IconButton onClick={prevSession} aria-label="previous session">
                <NavigateBeforeIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </Grid>

          <Grid item md={2} xs={4}>
            {currSessionResults.id !== oldSessionResults.length - 1 ? (
              <IconButton onClick={nextSession} aria-label="next session">
                <NavigateNextIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
