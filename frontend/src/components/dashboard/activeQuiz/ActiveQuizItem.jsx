import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/components/activeQuiz.module.css';

import { Grid, Typography } from '@material-ui/core';

export const ActiveQuizItem = ({ quiz, status, selectQuiz }) => {
  ActiveQuizItem.propTypes = {
    quiz: PropTypes.object,
    status: PropTypes.object,
    selectQuiz: PropTypes.func,
  };

  console.log(quiz);
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

  const selectItem = () => {
    // change grid look
    selectQuiz(quiz.id);
  };

  return (
    <Grid item xs={12} onClick={selectItem} className={styles.s}>
      <Typography>{quiz.name}</Typography>
      <Typography>{getStatusLabel()}</Typography>
    </Grid>
  );
};

export default ActiveQuizItem;
