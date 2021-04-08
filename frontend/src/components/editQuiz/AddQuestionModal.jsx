import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DefaultInput } from '../../components/FormInputs.jsx';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const [correctAnswerRadio, setCorrectAnswerRadio] = useState(0);
  const [checked, setChecked] = useState([]);

  const handleToggleCorrectAnswers = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSelectCorrectAnswer = (event) => {
    console.log(event.target.value);
    setCorrectAnswerRadio(event.target.value);
  };

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
    } else if (questionDetails.answers.length >= 6) {
      setErrors({ ...errors, answer: 'Cannot add more than 6 answers' });
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

  const handleDeleteAnswer = (answerID) => () => {
    const filteredAnswer = questionDetails.answers.filter(
      (answer) => answer.id !== answerID,
    );

    for (const i in filteredAnswer) {
      filteredAnswer[i].id = parseInt(i);
    }

    setQuestionDetails({
      ...questionDetails,
      answers: filteredAnswer,
    });
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
              <FormLabel component="legend">Attach a video</FormLabel>
              <br />
              <DefaultInput
                type="videoURL"
                handleFormChange={handleFormChange}
              />
              <br />
              <FormLabel component="legend">
                Add answer & select correct Answer/s
              </FormLabel>
              <List>
                {questionDetails.answers.map((answer, index) => {
                  let selectCorrectAnswer;

                  if (questionDetails.type === 'single') {
                    selectCorrectAnswer = (
                      <Radio
                        edge="start"
                        checked={correctAnswerRadio === answer.id}
                        onChange={handleSelectCorrectAnswer}
                        value={answer.id}
                        name="correctAnswerRadioButton"
                        inputProps={{
                          'aria-label': 'correctAnswer' + answer.answer,
                        }}
                      />
                    );
                  } else if (questionDetails.type === 'multiple') {
                    selectCorrectAnswer = (
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(answer.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{
                          'aria-labelledby': 'correctAnswer' + answer.answer,
                        }}
                      />
                    );
                  }

                  return (
                    <ListItem
                      key={answer.id}
                      onClick={handleToggleCorrectAnswers(answer.id)}>
                      <ListItemIcon>{selectCorrectAnswer}</ListItemIcon>
                      <ListItemText
                        id={answer.id}
                        primary={`Answer ${answer.id + 1}: ${answer.answer}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={handleDeleteAnswer(answer.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
                <ListItem>
                  <TextField
                    type="answer"
                    onChange={handleAnswersFormChange}
                    error={errors.answer !== ''}
                    helperText={errors.answer}
                    value={newAnswer}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="add"
                      onClick={handleAddAnswer}>
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
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
