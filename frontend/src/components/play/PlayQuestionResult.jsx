import { Box, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/play.module.css';

/**
 *
 * @param {string} state State of the player either correct, incorrect or late
 * @param {array} answers Array of string of the correct answers. Does not display if the play was right
 * @param {array} isLast
 * @returns
 */
export const PlayQuestionResult = ({
  state,
  answers,
  isLast,
  getQuizResult,
  playerResults,
  totalPoints,
}) => {
  PlayQuestionResult.propTypes = {
    state: PropTypes.string,
    answers: PropTypes.array,
    isLast: PropTypes.bool,
    getQuizResult: PropTypes.func,
    playerResults: PropTypes.any,
    totalPoints: PropTypes.number,
  };

  const WhiteTypography = withStyles({
    root: {
      color: '#FFFFFF',
    },
  })(Typography);

  const emptyValues = { text: '', bgColour: '#FFFFFF' };

  const [values, setValues] = useState(emptyValues);
  const [answerText, setAnswerText] = useState('');
  const [clickedResults, setClickedResults] = useState(false);

  useEffect(() => {
    makeAnswerText();
  }, [answers]);

  // Set correct text and background colour
  useEffect(() => {
    if (state === 'late') {
      setValues({ text: 'You were late to answer :C', bgColour: '#6930c3' });
    } else if (state === 'correct') {
      setValues({ text: 'Correct!', bgColour: '#44b800' });
    } else {
      setValues({ text: 'Wrong!', bgColour: '#b80043' });
    }
  }, [state]);

  // Set correct punctuation of text
  const makeAnswerText = () => {
    let text = '';

    if (answers.length === 1) {
      text += `${answers[0]}`;
    } else {
      for (let i = 0; i < answers.length; i++) {
        if (i === answers.length - 1) {
          text += `and ${answers[i]}`;
        } else if (i === 0) {
          text += ` ${answers[i]}`;
        } else {
          text += `, ${answers[i]} `;
        }
      }
    }
    setAnswerText(text);
  };

  const handleResultClick = () => {
    setClickedResults(true);
    getQuizResult();
  };

  return (
    <div
      className={styles.questionResultWrapper}
      style={{ backgroundColor: values.bgColour }}>
      <WhiteTypography variant="h5">
        Score: <b>{totalPoints}</b>
      </WhiteTypography>
      <Box mt={2}>
        <WhiteTypography variant="h4">{values.text}</WhiteTypography>
      </Box>
      {answers.length > 0 && (
        <Box mt={2}>
          <WhiteTypography variant="h6">
            The correct answer was <b>{answerText}</b>
          </WhiteTypography>
        </Box>
      )}
      {isLast && (
        <Box mt={2}>
          <Button variant="contained" onClick={handleResultClick}>
            View Results
          </Button>
        </Box>
      )}
      {clickedResults && playerResults === null && (
        <Box mt={2}>
          <WhiteTypography>Wait for the Admin to end the quiz</WhiteTypography>
        </Box>
      )}
    </div>
  );
};

export default PlayQuestionResult;
