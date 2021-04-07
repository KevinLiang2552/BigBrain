import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DefaultInput } from '../../components/FormInputs.jsx';
import AddIcon from '@material-ui/icons/Add';

export const AddQuestionModal = ({
  modalState,
  closeModal,
  handleAddQuestion,
  questionDetails,
  setQuestionDetails,
  errors,
  setErrors,
}) => {
  AddQuestionModal.propTypes = {
    modalState: PropTypes.bool,
    closeModal: PropTypes.func,
    handleAddQuestion: PropTypes.func,
    questionDetails: PropTypes.object,
    setQuestionDetails: PropTypes.func,
    errors: PropTypes.object,
    setErrors: PropTypes.func,
  };

  const [newAnswer, setNewAnswer] = useState('');

  const handleRadioChange = (event) => {
    setQuestionDetails({ ...questionDetails, type: event.target.value });
  };

  const handleFormChange = (type) => (event) => {
    setErrors({ ...errors, [type]: '' });
    setQuestionDetails({ ...questionDetails, [type]: event.target.value });
  };

  const handleAnswersFormChange = (event) => {
    setErrors({ ...errors, answer: '' });
    setNewAnswer(event.target.value);
  };

  const handleAddAnswer = () => {
    if (newAnswer === '') {
      setErrors({ ...errors, answer: 'Cannot add an empty answer' });
      console.log(errors);
    } else {
      setQuestionDetails({
        ...questionDetails,
        answers: [
          ...questionDetails.answers,
          { id: questionDetails.answers.length, answer: newAnswer },
        ],
      });
      setNewAnswer('');
    }
  };

  return (
    <>
      <Dialog
        open={modalState}
        onClose={closeModal}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Question</DialogTitle>
        <form>
          <DialogContent>
            <FormControl component="fieldset">
              <FormLabel component="legend">Question Type</FormLabel>
              <RadioGroup
                aria-label="Question Type"
                name="questionType"
                value={questionDetails.type}
                onChange={handleRadioChange}>
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label="Single"
                />
                <FormControlLabel
                  value="multiple"
                  control={<Radio />}
                  label="Multiple"
                />
              </RadioGroup>
              <br />
              <FormLabel component="legend">Question to ask</FormLabel>
              <br />
              <DefaultInput
                type="question"
                handleFormChange={handleFormChange}
                error={errors.question !== ''}
                errorMessage={errors.question}
              />
              <br />
              <FormLabel component="legend">Duration in seconds</FormLabel>
              <br />
              <DefaultInput
                type="duration"
                handleFormChange={handleFormChange}
                error={errors.duration !== ''}
                errorMessage={errors.duration}
              />
              <br />
              <FormLabel component="legend">
                Number of points for the question
              </FormLabel>
              <br />
              <DefaultInput
                type="points"
                handleFormChange={handleFormChange}
                error={errors.points !== ''}
                errorMessage={errors.points}
              />
              <br />
              <FormLabel component="legend">Add answers</FormLabel>
              <List>
                {questionDetails.answers.map((answer, index) => {
                  return (
                    <ListItem key={answer.id}>
                      Answer {answer.id + 1}: {answer.answer}
                    </ListItem>
                  );
                })}
                <ListItem>
                  <Grid>
                    <TextField
                      type="answer"
                      onChange={handleAnswersFormChange}
                      error={errors.answer !== ''}
                      helperText={errors.answer}
                      value={newAnswer}
                    />
                    <Fab
                      color="primary"
                      aria-label="add"
                      size="small"
                      onClick={handleAddAnswer}>
                      <AddIcon />
                    </Fab>
                  </Grid>
                </ListItem>
              </List>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddQuestion} color="primary">
              Add Question
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
