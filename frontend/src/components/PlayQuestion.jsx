import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@material-ui/core';

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
      <Typography>{question.question}</Typography>

      <Grid container>
        {question.answers.map((answer) => {
          return (
            <Grid xs={12} md={6} item key={answer.id}>
              <Button>{answer.answer}</Button>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default PlayQuestion;
