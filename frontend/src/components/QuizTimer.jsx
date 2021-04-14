import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import styles from '../styles/play.module.css';

export const QuizTimer = ({ duration }) => {
  QuizTimer.propTypes = {
    duration: PropTypes.number.isRequired,
  };

  const [timeLeft, setTimeLeft] = useState(duration);

  const [timer, setTimer] = useState(-1);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    setTimer(interval);
    return () => {
      if (timeLeft > 0) {
        clearInterval(timer);
      }
    };
  }, []);

  // Circular progress is determined by a 100 to 1 scale. This adjusts the progress to move the whole circle even if it is above or below 100
  const getRelativeTimerValue = () => {
    const interval = 100 / duration;
    return Math.floor(interval * timeLeft);
  };

  return (
    <Box className={styles.quizTimerWrapper}>
      <CircularProgress
        size={60}
        variant="determinate"
        value={getRelativeTimerValue()}
      />
      <Box className={styles.quizTimerTextWrapper}>
        <Typography className={styles.quizTimerText}>{timeLeft}</Typography>
      </Box>
    </Box>
  );
};

export default QuizTimer;
