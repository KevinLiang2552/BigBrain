import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/dashboard.module.css';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

export const QuizCard = ({ name }) => {
  QuizCard.propTypes = {
    name: PropTypes.string,
  };
  return (
    <Grid item xs={12} md={4} className={styles.quizWrapper}>
      <Card className={styles.quizCard}>
        <CardContent>
          <Typography>{name}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default QuizCard;
