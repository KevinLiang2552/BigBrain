import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

/**
 *
 * @param {func} handleSubmitAnswers Submit function that will submit player answers
 * @returns
 */
export const SubmitButton = ({ handleSubmitAnswers }) => {
  SubmitButton.propTypes = { handleSubmitAnswers: PropTypes.func };

  const Submit = withStyles({
    root: {
      width: '100%',
      fontSize: '2em',
    },
  })(Button);

  return (
    <Grid xs={12} item>
      <Submit onClick={handleSubmitAnswers} variant="contained">
        Submit Answers
      </Submit>
    </Grid>
  );
};

export default SubmitButton;
