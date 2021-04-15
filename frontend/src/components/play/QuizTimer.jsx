import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import styles from '../../styles/play.module.css';

export const QuizTimer = ({ duration, timeLeft }) => {
  QuizTimer.propTypes = {
    duration: PropTypes.number,
    timeLeft: PropTypes.number,
  };

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
