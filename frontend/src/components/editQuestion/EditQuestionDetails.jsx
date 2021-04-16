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

export const EditQuestionDetails = ({
  questionDetails,
  handleQuestionUpdate,
  handleQuestionTypeChange,
  setQuestionDetails,
}) => {
  EditQuestionDetails.propTypes = {
    questionDetails: PropTypes.object,
    handleQuestionUpdate: PropTypes.func,
    handleQuestionTypeChange: PropTypes.func,
    setQuestionDetails: PropTypes.func,
  };

  const [correctAnswerRadio, setCorrectAnswerRadio] = useState(
    questionDetails.correctAnswers[0],
  );
  const [checked, setChecked] = useState(questionDetails.correctAnswers);
  const [enabledInput, setEnabledInputs] = useState(false);

  useEffect(() => {
    setCorrectAnswerRadio(questionDetails.correctAnswers[0]);
    setChecked(questionDetails.correctAnswers);
  }, [questionDetails]);

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

  // Function for selecting a singular correct answer
  const handleSelectCorrectAnswer = (event) => {
    setCorrectAnswerRadio(parseInt(event.target.value));
    setQuestionDetails({
      ...questionDetails,
      correctAnswers: [parseInt(event.target.value)],
    });
  };

  const handleEnableEdit = () => {
    setEnabledInputs(true);
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

  const setAnswersField = (answer, index) => {
    if (enabledInput) {
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
    } else {
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
        <Typography variant="h4">Main Details</Typography>
        <IconButton onClick={handleEnableEdit}>
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid container>
        <Grid item md={4} xs={12}>
          {enabledInput === true ? (
            <TextField
              required
              id="question"
              label="Question"
              defaultValue={questionDetails.question}
              variant="filled"
              onChange={handleQuestionUpdate}
            />
          ) : (
            <>
              <FormLabel variant="h5">Question</FormLabel>
              <Typography> {questionDetails.question}</Typography>
            </>
          )}
          <br />
          <FormLabel variant="h5">Type</FormLabel>
          <RadioGroup
            aria-label="Question Type"
            name="questionType"
            value={questionDetails.type}
            onChange={handleQuestionTypeChange}>
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
          <Typography variant="h5">Answers:</Typography>
          <List>{questionDetails.answers.map(setAnswersField)}</List>
        </Grid>
      </Grid>
    </>
  );
};
