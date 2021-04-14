import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import API from '../../api/api.js';
import styles from '../../styles/lobby.module.css';
import { getPlayerToken } from '../../helpers/user.js';
import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';

export const LobbyPage = () => {
  const api = new API('http://localhost:5005');
  const { id } = useParams();
  console.log(id);

  const [started, setStarted] = useState(false);

  // Insert funny joke here, legit I have no funny jokes crap.
  const funnyText = [
    '"0" == []',
    'A rabbit and a tortoise crossed the road, only the rabbit survived',
    'This time will be different',
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
  });

  // get status of user
  useEffect(async () => {
    const statusInterval = setInterval(function () {
      if (started) {
        clearInterval(statusInterval);
      }
      updateStatus();
    }, 1000);
    return () => {
      if (!started) {
        clearInterval(statusInterval);
      }
    };
  }, []);

  const updateStatus = async () => {
    const res = await api.nonAuthorisedRequest(
      'GET',
      `play/${getPlayerToken()}/status`,
    );
    if (res.status === 200) {
      setStarted(res.data.started);
    }
  };

  return (
    <Container>
      {started ? (
        <Typography>STARTED</Typography>
      ) : (
        <div className={styles.loadingProgress}>
          <CircularProgress size={100} />
          <Box mt={2}>
            <Typography className={styles.loadingText}>
              {loadingText}
            </Typography>
          </Box>
        </div>
      )}
    </Container>
  );
};
