import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import styles from '../../styles/play.module.css';

export const QuizTimer = ({ duration, endQuestion }) => {
  QuizTimer.propTypes = {
    duration: PropTypes.number,
    endQuestion: PropTypes.func,
  };

  const [timeLeft, setTimeLeft] = useState(duration);

  const [timer, setTimer] = useState(-1);

  // set timeLeft to duration
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // On first load set interval to reduce time left by 1 each second
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

  // When timeLeft is 0 or less end the question
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuestion();
    }
  }, [timeLeft]);

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
