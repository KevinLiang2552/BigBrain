import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/components/activeQuiz.module.css';

import { Grid, Typography } from '@material-ui/core';

export const ActiveQuizItem = ({
  quiz,
  status,
  selectQuiz,
  selectedQuizId,
  isEven,
}) => {
  ActiveQuizItem.propTypes = {
    quiz: PropTypes.object,
    status: PropTypes.object,
    selectQuiz: PropTypes.func,
    selectedQuizId: PropTypes.number,
    isEven: PropTypes.bool,
  };

  const [active, setActive] = useState(false);

  useEffect(() => {
    console.log(selectedQuizId, quiz.id);
    if (selectedQuizId === quiz.id) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selectedQuizId]);

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
    <Grid item xs={12} onClick={selectItem}>
      <div
        className={`${styles.quizItem} ${
          active
            ? styles.quizItemActive
            : isEven
            ? styles.quizItemEven
            : styles.quizItemOdd
        } `}>
        <Typography className={styles.quizItemName}>{quiz.name}</Typography>
        <Typography className={styles.quizItemStatus}>
          {getStatusLabel()}
        </Typography>
      </div>
    </Grid>
  );
};

export default ActiveQuizItem;
