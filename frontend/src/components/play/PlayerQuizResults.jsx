import React from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ResultLine from './ResultLine.jsx';

import styles from '../../styles/play.module.css';

export const PlayerQuizResults = ({ playerResults, totalScore }) => {
  PlayerQuizResults.propTypes = {
    playerResults: PropTypes.object,
    totalScore: PropTypes.number,
  };

  const getFinalScoreText = () => {
    let amountRight = 0;
    for (const result of playerResults) {
      if (result.correct) {
        amountRight++;
      }
    }

    return `${amountRight} / ${playerResults.length} correct! Total score: ${totalScore}`;
  };

  return (
    <Container>
      <Grid container>
        <Grid xs={12} className={styles.resultsCenterText}>
          <Box mt={2} mb={2}>
            <Typography variant="h2"> Quiz Results</Typography>
          </Box>
        </Grid>
        {playerResults.map((question, index) => {
          return <ResultLine key={index} question={question} index={index} />;
        })}
        <Grid xs={12} className={styles.resultsCenterText}>
          <Box mt={2} mb={2}>
            <Typography>{getFinalScoreText()}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerQuizResults;
