import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

/**
 * @param {object} errors An object with errors that are to be displayed to the user
 * @param {object} questionDetails An object that holds all the errors a question has
 * @param {boolean} enabledInput The state in which editing is enabled
 * @param {function} toggleEnabledEdit A function that should toggle the enabled input state
 * @param {function} handleUpdateDetails A function that should set errors and set questionDetails
 * @param {function} setErrors A function that should set the errors the user may have created
 */

export const EditQuestionDetails = ({
  errors,
  questionDetails,
  enabledInput,
  toggleEnableEdit,
  handleUpdateDetail,
  setQuestionDetails,
  setErrors,
}) => {
  EditQuestionDetails.propTypes = {
    errors: PropTypes.object,
    questionDetails: PropTypes.object,
    enabledInput: PropTypes.bool,
    toggleEnableEdit: PropTypes.func,
    handleUpdateDetail: PropTypes.func,
    setQuestionDetails: PropTypes.func,
    setErrors: PropTypes.func,
  };

  const [newAnswer, setNewAnswer] = useState('');
  const [correctAnswerRadio, setCorrectAnswerRadio] = useState(
    questionDetails.correctAnswers[0],
  );
  const [checked, setChecked] = useState(questionDetails.correctAnswers);

  useEffect(() => {
    setCorrectAnswerRadio(questionDetails.correctAnswers[0]);
    setChecked(questionDetails.correctAnswers);
  }, [questionDetails.correctAnswers]);

  // Function for selecting multiple correct answers
  const handleToggleCorrectAnswers = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(parseInt(value));
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setQuestionDetails({ ...questionDetails, correctAnswers: newChecked });
  };

  // Function for handling the new answers field.
  const handleAnswersFormChange = (event) => {
    setErrors({ ...errors, answer: '' });
    setNewAnswer(event.target.value);
  };

  // Function for selecting a singular correct answer
  const handleSelectCorrectAnswer = (event) => {
    setCorrectAnswerRadio(parseInt(event.target.value));
    setQuestionDetails({
      ...questionDetails,
      correctAnswers: [parseInt(event.target.value)],
    });
  };

  // Function for adding new answers to the question.
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

  // Function for deleting answers from the question.
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

  // Function for setting the answer field depending on if it is
  // to be edited or not, as well as the answer type.
  const setAnswersField = (answer, index) => {
    // Check if the user is allowed to edit
    if (enabledInput) {
      let selectCorrectAnswer;

      // Check the question type and set the fields accordingly
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
        <>
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
        </>
      );
    } else {
      // If not editing, display a non-editable list
      let icon;
      if (questionDetails.correctAnswers.includes(answer.id)) {
        icon = <CheckIcon />;
      } else {
        icon = <ClearIcon />;
      }
      return (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={`${answer.answer}`} />
          </ListItem>
        </React.Fragment>
      );
    }
  };

  return (
    <>
      <Grid container>
        {/* Header for the edit screen
        Checks if editing or not to remove the edit icon */}

        <Typography variant="h4">Main Details</Typography>
        {enabledInput === true ? (
          <></>
        ) : (
          <IconButton onClick={toggleEnableEdit}>
            <EditIcon />
          </IconButton>
        )}
      </Grid>
      <Grid container>
        <Grid item md={4} xs={12}>
          {/* Editing a question, point and duration
          Checks if editing or not to change into a input field 
          If not just display the value */}
          {enabledInput === true ? (
            <TextField
              required
              id="question"
              label="Question"
              defaultValue={questionDetails.question}
              variant="filled"
              onChange={handleUpdateDetail('question')}
              error={errors.question !== ''}
              helperText={errors.question}
            />
          ) : (
            <>
              <FormLabel variant="h5">Question</FormLabel>
              <Typography> {questionDetails.question}</Typography>
            </>
          )}
          <br />
          {enabledInput === true ? (
            <TextField
              required
              id="points"
              label="Points"
              defaultValue={questionDetails.points}
              variant="filled"
              type="number"
              onChange={handleUpdateDetail('points')}
              error={errors.points !== ''}
              helperText={errors.points}
            />
          ) : (
            <>
              <FormLabel variant="h5">Points</FormLabel>
              <Typography> {questionDetails.points}</Typography>
            </>
          )}
          <br />
          {enabledInput === true ? (
            <TextField
              required
              id="duration"
              label="Duration"
              defaultValue={questionDetails.duration}
              variant="filled"
              type="number"
              onChange={handleUpdateDetail('duration')}
              error={errors.duration !== ''}
              helperText={errors.duration}
            />
          ) : (
            <>
              <FormLabel variant="h5">Duration</FormLabel>
              <Typography> {questionDetails.duration}</Typography>
            </>
          )}
          <br />
          {/* Editing a the type of question
          Checks if editing or not to allow the user to change the type */}
          <FormLabel variant="h5">Type</FormLabel>
          <RadioGroup
            aria-label="Question Type"
            name="questionType"
            value={questionDetails.type}
            onChange={handleUpdateDetail('type')}>
            <FormControlLabel
              value="single"
              control={<Radio />}
              label="Single"
              disabled={!enabledInput}
            />
            <FormControlLabel
              value="multiple"
              control={<Radio />}
              label="Multiple"
              disabled={!enabledInput}
            />
          </RadioGroup>
        </Grid>
        <Grid item md={4} xs={12}>
          {/* Editing a the answers to a question
          Checks if editing or not to allow the user to delete or add answers
          Also allows the user to select new correct answers */}
          <Typography variant="h5">Answers:</Typography>
          <List>
            {questionDetails.answers.map(setAnswersField)}
            {enabledInput && (
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
            )}
          </List>
        </Grid>
      </Grid>
    </>
  );
};
