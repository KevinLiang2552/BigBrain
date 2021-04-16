import { Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/play.module.css';

export const PlayQuestionResult = ({ state, answer = '', timeAnswered }) => {
  PlayQuestionResult.propTypes = {
    state: PropTypes.string,
    answer: PropTypes.array,
    timeAnswered: PropTypes.number,
  };

  const WhiteTypography = withStyles({
    root: {
      color: '#FFFFFF',
    },
  })(Typography);

  const emptyValues = { text: '', bgColour: '#FFFFFF' };

  const [values, setValues] = useState(emptyValues);
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    makeAnswerText();
  }, [answer]);

  useEffect(() => {
    if (state === 'late') {
      setValues({ text: 'You were late to answer :C', bgColour: '#6930c3' });
    } else if (state === 'correct') {
      setValues({ text: 'Correct!', bgColour: '#44b800' });
    } else {
      setValues({ text: 'Wrong!', bgColour: '#b80043' });
    }
  }, [state]);

  const makeAnswerText = () => {
    let text = '';
    console.log(answer);
    if (answer.length === 1) {
      text += `${answer[0]}`;
    } else {
      for (let i = 0; i < answer.length; i++) {
        if (i === answer.length - 1) {
          text += `or ${answer[i]}`;
        } else if (i === 0) {
          text += ` ${answer[i]}`;
        } else {
          text += `, ${answer[i]} `;
        }
      }
    }
    setAnswerText(text);
  };

  return (
    <div
      className={styles.questionResultWrapper}
      style={{ backgroundColor: values.bgColour }}>
      <WhiteTypography variant="h4">{values.text}</WhiteTypography>
      {answer !== '' && (
        <Box mt={2}>
          <WhiteTypography variant="h6">
            The correct answer was <b>{answerText}</b>
          </WhiteTypography>
        </Box>
      )}
    </div>
  );
};

export default PlayQuestionResult;
