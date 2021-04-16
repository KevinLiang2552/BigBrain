import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export const PlayQuestionResult = ({ state, answer, timeAnswered }) => {
  PlayQuestionResult.propTypes = {
    state: PropTypes.string,
    answer: PropTypes.string,
    timeAnswered: PropTypes.number,
  };
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    if (state === 'late') {
      setResultText('You were late to answer :C');
    } else if (state === 'correct') {
      setResultText('Correct!');
    } else {
      setResultText('Wrong!');
    }
  }, [state]);

  return (
    <Box>
      <Typography>{resultText}</Typography>
    </Box>
  );
};

export default PlayQuestionResult;
