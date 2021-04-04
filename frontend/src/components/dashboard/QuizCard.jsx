import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/dashboard.module.css';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const QuizCard = ({ quiz, deleteQuiz }) => {
  QuizCard.propTypes = {
    quiz: PropTypes.object,
    deleteQuiz: PropTypes.func,
  };

  return (
    <Grid item xs={12} md={4} className={styles.quizWrapper}>
      <Card className={styles.quizCard}>
        <CardContent>
          <Typography>{quiz.name}</Typography>
          <Button
            onClick={function () {
              deleteQuiz(quiz.id);
            }}>
            <DeleteIcon />
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default QuizCard;
