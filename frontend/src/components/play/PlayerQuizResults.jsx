import React from 'react';
import { Box, Container, Grid, List, Typography } from '@material-ui/core';
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

    return `${amountRight} / ${playerResults.length} questions correct`;
  };

  return (
    <Container>
      <Grid container>
        <Grid xs={12} className={styles.resultsCenterText}>
          <Box mt={2} mb={2}>
            <Typography variant="h2"> Quiz Results</Typography>
          </Box>
        </Grid>
        <Grid xs={12} className={styles.resultsCenterText}>
          <List>
            {playerResults.map((question, index) => {
              return (
                <ResultLine key={index} question={question} index={index} />
              );
            })}
          </List>
        </Grid>
        <Grid xs={12} className={styles.resultsCenterText}>
          <Box mt={2}>
            <Typography variant="h6">{getFinalScoreText()}</Typography>
          </Box>
        </Grid>
        <Grid xs={12} className={styles.resultsCenterText}>
          <Box mb={2}>
            <Typography variant="h5">Total score: {totalScore}</Typography>
          </Box>
        </Grid>
        <Grid xs={12} className={styles.resultsCenterText}>
          <Box className={styles.resultScoreExplanation}>
            <Typography variant="h6">
              How the each question score is calculated
            </Typography>
            <Typography variant="subtitle">
              <ul>
                <li>
                  The score of each question is calculated by the ratio of time
                  left by the amount of time given the result is rounded to a
                  whole number between 1 to 10.
                </li>
                <li>
                  This value is mutliplied by 0.05 giving you a maximum value of
                  0.5 bonus points possible each question.
                </li>

                <li>
                  This value is added with the points given by the question and
                  then times by 100 to make you think the scores are worth alot.
                </li>
                {totalScore === 0 && (
                  <li>
                    Not that it matter to you anyways, as your whole score got
                    mutliplied by 0 :D
                  </li>
                )}
              </ul>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerQuizResults;
