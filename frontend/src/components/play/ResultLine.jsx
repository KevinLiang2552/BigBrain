import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from '../../styles/play.module.css';

export const ResultLine = ({ question, index }) => {
  ResultLine.propTypes = {
    question: PropTypes.object,
    index: PropTypes.number,
  };

  const getText = () => {
    let text = 'Q' + (index + 1).toString() + '.       ';
    if (question.correct) {
      text += 'Correct';
    } else {
      text += 'Incorrect';
    }
    return text;
  };

  return (
    <Grid item xs={12} className={styles.resultsCenterText}>
      <div className={styles.resultLineTextWrapper}>
        <Typography variant="h5">{getText()}</Typography>
      </div>
    </Grid>
  );
};

export default ResultLine;
