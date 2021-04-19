import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/components/activeQuiz.module.css';

import { ListItem, Typography } from '@material-ui/core';

export const ActiveQuizItem = ({
  quiz,
  status,
  selectQuiz,
  selectedQuizId,
}) => {
  ActiveQuizItem.propTypes = {
    quiz: PropTypes.object,
    status: PropTypes.object,
    selectQuiz: PropTypes.func,
    selectedQuizId: PropTypes.number,
    isEven: PropTypes.bool,
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

  const selectItem = () => {
    // change grid look
    selectQuiz(quiz.id);
  };

  return (
    <ListItem
      className={styles.quizItem}
      onClick={selectItem}
      selected={selectedQuizId === quiz.id}>
      <Typography className={styles.quizItemName}>{quiz.name}</Typography>
      <Typography className={styles.quizItemStatus}>
        {getStatusLabel()}
      </Typography>
    </ListItem>
  );
};

export default ActiveQuizItem;
