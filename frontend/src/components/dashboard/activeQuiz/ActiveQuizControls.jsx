import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/components/activeQuiz.module.css';

import { Grid, Typography } from '@material-ui/core';

export const ActiveQuizControls = ({ quiz, status }) => {
  ActiveQuizControls.propTypes = {
    quiz: PropTypes.object,
    status: PropTypes.object,
  };

  // Get status label based on the position the quiz is currently in
  const getStatusLabel = () => {
    let positionLabel = '';
    const position = status.position;
    const questionsLength = status.questions.length;

    if (position === -1) {
      positionLabel = 'Lobby';
    } else if (position < questionsLength) {
      positionLabel = `Question  ${position + 1}: ${
        status.questions[position].question
      }`;
    } else {
      positionLabel = 'Results';
    }

    return positionLabel;
  };

  return (
    <Grid container className={styles.s}>
      <Typography>{quiz.name}</Typography>
      <Typography>{getStatusLabel()}</Typography>
    </Grid>
  );
};

export default ActiveQuizControls;
