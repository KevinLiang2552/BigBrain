import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import API from '../../api/api.js';
import styles from '../../styles/lobby.module.css';
import { getPlayerToken } from '../../helpers/user.js';
import { emptyQuestion } from '../../helpers/emptyTypes.js';
import PlayQuestion from '../../components/play/PlayQuestion.jsx';

import { Box, CircularProgress, Typography } from '@material-ui/core';

export const LobbyPage = () => {
  const api = new API('http://localhost:5005');
  // const { id } = useParams();

  // Status of lobby = true or false
  const [started, setStarted] = useState(false);

  // interval value of status inteval, so we can clear the interval
  const [statusInterval, setStatusInterval] = useState(-100);

  const [newQuestionInterval, setNewQuestionInterval] = useState(-1);

  const [currentQuestion, setCurrentQuestion] = useState(emptyQuestion);

  // Insert funny joke here, legit I have no funny jokes crap.
  const funnyText = [
    '"0" == []',
    'You are legally allowed to leave after 15 minutes',
    '"This time will be different"',
    'Maybe you will win this time and not disappoint your family',
    'If you lose at least you can do something else',
  ];
  let previousFunnyText = -1;

  const [loadingText, setLoadingText] = useState(
    'Waiting for Admin to start the quiz!',
  );

  // Set interval for change in text for loading screen
  useEffect(() => {
    const funnyInterval = setInterval(function () {
      let newFunnyText;
      do {
        newFunnyText = Math.floor(Math.random() * funnyText.length);
      } while (newFunnyText === previousFunnyText);

      setLoadingText(funnyText[newFunnyText]);
      previousFunnyText = newFunnyText;
    }, 10000);

    return () => clearInterval(funnyInterval);
  }, []);

  // When started value changes usually to true, get the first question
  useEffect(async () => {
    if (started) {
      clearInterval(statusInterval);

      getQuestion();
    } else {
      const interval = setInterval(function () {
        updateStatus();
      }, 1000);
      setStatusInterval(interval);
    }

    // If the interval is not cleaned up (player left before lobby started) remove interval
    return () => {
      if (!started) {
        clearInterval(statusInterval);
      }
    };
  }, [started]);

  // Get player lobby status
  const updateStatus = async () => {
    const res = await api.nonAuthorisedRequest(
      'GET',
      `play/${getPlayerToken()}/status`,
    );
    if (res.status === 200) {
      setStarted(res.data.started);
    }
  };

  // Get current question of quiz
  const getQuestion = async () => {
    const res = await api.authorisedRequest(
      'GET',
      `play/${getPlayerToken()}/question`,
    );
    if (res.status === 200) {
      const newQuestion = res.data.question;
      if (currentQuestion.id !== newQuestion.id) {
        setCurrentQuestion(newQuestion);
      }
    } else {
      console.log(res.data.error);
    }
  };

  useEffect(() => {
    clearInterval(newQuestionInterval);
    setNewQuestionInterval(-1);
    return () => clearInterval(newQuestionInterval);
  }, [currentQuestion]);

  // Constantly call api for new question
  const pageForNewQuestion = () => {
    if (currentQuestion.isLast) {
      console.log('IS LAST QUESTION');
    } else {
      const interval = setInterval(function () {
        getQuestion();
      }, 1000);
      setNewQuestionInterval(interval);
    }
  };

  return (
    <>
      {/* If quiz has started play question */}
      {started ? (
        <PlayQuestion
          questionData={currentQuestion}
          pageForNewQuestion={pageForNewQuestion}
        />
      ) : (
        // Else stuck in a lobby
        <div className={styles.loadingProgress}>
          <CircularProgress size={100} />
          <Box mt={2}>
            <Typography className={styles.loadingText}>
              {loadingText}
            </Typography>
          </Box>
        </div>
      )}
    </>
  );
};
