import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/dashboard.module.css';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

export const QuizCard = ({ title }) => {
  QuizCard.propTypes = {
    title: PropTypes.string,
  };
  return (
    <Grid xs={12} md={4} className={styles.quizWrapper}>
      <Card className={styles.quizCard}>
        <CardContent>
          <Typography>{title}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default QuizCard;
