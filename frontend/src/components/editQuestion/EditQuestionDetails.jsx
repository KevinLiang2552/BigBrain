import React from 'react';
import {
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { EditInput } from '../../components/FormInputs.jsx';

export const EditQuestionDetails = ({
  questionDetails,
  handleQuestionUpdate,
  handleQuestionTypeChange,
}) => {
  EditQuestionDetails.propTypes = {
    questionDetails: PropTypes.object,
    handleQuestionUpdate: PropTypes.func,
    handleQuestionTypeChange: PropTypes.func,
  };

  return (
    <Grid item md={4} xs={12}>
      <Typography variant="h4">Main Details</Typography>
      <FormLabel variant="h5">Question</FormLabel>
      <EditInput
        type="Question"
        value={questionDetails.question}
        handleUpdate={handleQuestionUpdate}
      />
      <FormLabel variant="h5">Type</FormLabel>
      <RadioGroup
        aria-label="Question Type"
        name="questionType"
        value={questionDetails.type}
        onChange={handleQuestionTypeChange}>
        <FormControlLabel value="single" control={<Radio />} label="Single" />
        <FormControlLabel
          value="multiple"
          control={<Radio />}
          label="Multiple"
        />
      </RadioGroup>
    </Grid>
  );
};
