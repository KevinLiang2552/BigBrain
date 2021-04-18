import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/play.module.css';

import { Box, CircularProgress } from '@material-ui/core';
import WhiteTypography from '../CustomTypography.jsx';
import { withStyles } from '@material-ui/core/styles';

/**
 *
 * @param {number} duration total duration of the current question
 * @param {number} timeLeft total time left until the question ends
 * @returns Quiz Timer progress circle
 */
export const QuizTimer = ({ duration, timeLeft }) => {
  QuizTimer.propTypes = {
    duration: PropTypes.number,
    timeLeft: PropTypes.number,
  };

  const QuizProgress = withStyles({
    root: {
      color: '#52D4C5',
    },
  })(CircularProgress);

  // Circular progress is determined by a 100 to 1 scale. This adjusts the progress to move the whole circle even if it is above or below 100
  const getRelativeTimerValue = () => {
    const interval = 100 / duration;
    return Math.floor(interval * timeLeft);
  };

  return (
    <Box className={styles.quizTimerWrapper}>
      <QuizProgress
        size={60}
        thickness={4}
        variant="determinate"
        value={getRelativeTimerValue()}
      />
      <Box className={styles.quizTimerTextWrapper}>
        <WhiteTypography className={styles.quizTimerText}>
          {timeLeft}
        </WhiteTypography>
      </Box>
    </Box>
  );
};

export default QuizTimer;
