import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import PlayQuestionButton from '../components/PlayQuestionButton.jsx';
import QuizTimer from '../components/QuizTimer.jsx';
import styles from '../styles/play.module.css';

/**
 *
 * @param {object} questionData The question's data (name, answers, etc...)
 * @returns
 */
export const PlayQuestion = ({ questionData }) => {
  PlayQuestion.propTypes = {
    questionData: PropTypes.object,
  };

  // Question use state
  const [question, setQuestion] = useState(questionData);

  // Actively update question use state when question data changes
  useEffect(() => {
    setQuestion(questionData);
  }, [questionData]);

  return (
    <>
      <Grid container>
        <Grid xs={12} item>
          <Box mt={3} mb={3} className={styles.questionDisplay}>
            <Typography></Typography>
            <Typography variant="h3">{question.question}</Typography>
            <QuizTimer duration={question.duration} />
          </Box>
        </Grid>
        <Grid container spacing={1} className={styles.questionGrid}>
          {question.answers.map((ans) => {
            return (
              <PlayQuestionButton
                key={ans.id}
                answer={ans.answer}
                id={ans.id}
              />
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default PlayQuestion;
