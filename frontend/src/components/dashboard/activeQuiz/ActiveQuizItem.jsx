import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/components/activeQuiz.module.css';

import { ListItem, Typography } from '@material-ui/core';

/**
 * A list item in the active quiz explorer
 * @param {object} quiz              Quiz data
 * @param {object} status            Status of current session of quiz
 * @param {function} selectQuiz      Select quiz function to change current selected quiz
 * @param {number} selectedQuizId    The current id of the selected quiz
 * @returns
 */
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
  };

  // Get status label based on the position the quiz is currently in
  const getStatusLabel = () => {
    let positionLabel = '';
    const position = status.position;
    const questionsLength = status.questions.length;

    if (position === -1) {
      positionLabel = 'Lobby';
    } else if (position < questionsLength) {
      positionLabel = `Question ${position + 1}: ${
        status.questions[position].question
      }`;
    } else {
      positionLabel = 'Results';
    }

    return positionLabel;
  };

  const selectItem = () => {
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
