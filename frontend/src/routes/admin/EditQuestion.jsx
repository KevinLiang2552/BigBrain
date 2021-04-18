import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import { useParams } from 'react-router';
import { emptyQuestion } from '../../helpers/emptyTypes.js';
import { EditQuestionDetails } from '../../components/editQuestion/EditQuestionDetails.jsx';
import { EditExternalMedia } from '../../components/editQuestion/EditExternalMedia.jsx';
import styles from '../../styles/editQuestion.module.css';
import API from '../../api/api.js';
import { isObjectValueEmpty } from '../../helpers/generalHelpers.js';

export const EditQuestionPage = () => {
  const api = new API('http://localhost:5005');
  const { id, questionID } = useParams();

  // Errors to be displayed.
  const defaultErrors = {
    question: '',
    duration: '',
    points: '',
    answer: '',
  };

  const [questionDetails, setQuestionDetails] = useState(emptyQuestion);
  const [questionList, setQuestionList] = useState([]);
  const [errors, setErrors] = useState(defaultErrors);
  const [enabledInput, setEnabledInput] = useState(false);

  const setQuestion = async () => {
    const quizDetailsRes = await api.authorisedRequest(
      'GET',
      `admin/quiz/${id}`,
    );
    if (quizDetailsRes.status === 200) {
      setQuestionList(quizDetailsRes.data.questions);
      setQuestionDetails(quizDetailsRes.data.questions[questionID]);
    } else {
      console.log(quizDetailsRes.data.error);
    }
  };

  useEffect(() => {
    setQuestion();
  }, []);

  const handleUpdateDetail = (type) => (event) => {
    setErrors({ ...errors, [type]: '' });
    setQuestionDetails({
      ...questionDetails,
      [type]: event.target.value,
    });
  };

  const [mainContent, setMainContent] = useState('mainDetails');

  const handleContentChange = (type) => () => {
    setMainContent(type);
    if (enabledInput) toggleEnableEdit();
  };

  const toggleEnableEdit = () => {
    setEnabledInput(!enabledInput);
  };

  const contentChange = () => {
    if (mainContent === 'mainDetails') {
      return (
        <EditQuestionDetails
          questionDetails={questionDetails}
          handleUpdateDetail={handleUpdateDetail}
          setQuestionDetails={setQuestionDetails}
          toggleEnableEdit={toggleEnableEdit}
          enabledInput={enabledInput}
          errors={errors}
          setErrors={setErrors}
        />
      );
    } else if (mainContent === 'externalMedia') {
      return (
        <EditExternalMedia
          questionDetails={questionDetails}
          handleImageUpload={handleImageUpload}
        />
      );
    }
  };

  // Functions for handling photo upload
  const reader = new FileReader();

  const handleImageUpload = () => {
    const imageUpload = document.getElementById('questionImageUpload');
    reader.readAsDataURL(imageUpload.files[0]);
  };

  reader.addEventListener('load', () => {
    setQuestionDetails({ ...questionDetails, imgSrc: reader.result });
  });

  const changeQuestion = () => {
    if (enabledInput)
      return (
        <Grid item md={4} xs={12}>
          <Button onClick={handleCancelChanges} variant="contained">
            Cancel Changes
          </Button>
          <Button onClick={handleEditQuestion} variant="contained">
            Save Changes
          </Button>
        </Grid>
      );
  };

  const handleCancelChanges = () => {
    setQuestion();
    toggleEnableEdit();
  };

  // Main Function for adding a question to the database
  const handleEditQuestion = async () => {
    setErrors(defaultErrors);

    // Basic error checking
    const errorList = defaultErrors;
    if (questionDetails.question === '') {
      errorList.question = 'Question must not be empty';
    }

    const duration = parseInt(questionDetails.duration);

    if (questionDetails.duration === '') {
      errorList.duration = 'Duration must not be empty';
    } else if (isNaN(duration)) {
      errorList.duration = 'Duration must be a number';
    } else if (duration <= 0) {
      errorList.duration = 'Duration has to be greater than 0';
    }

    const points = parseInt(questionDetails.points);

    if (questionDetails.points === '') {
      errorList.points = 'Points must not be empty';
    } else if (isNaN(points)) {
      errorList.points = 'Points must be a whole number';
    } else if (points <= 0) {
      errorList.points = 'Points has to be greater than 0';
    }

    if (
      questionDetails.answers.length < 2 ||
      questionDetails.answers.length > 6
    ) {
      errorList.answer = 'Have have between 2 and 6 answers';
    }

    if (questionDetails.correctAnswers.length === 0) {
      errorList.answer = 'Must have at least one correct answer';
    }

    // Adding question
    if (!isObjectValueEmpty(errorList)) {
      setErrors(errorList);
    } else {
      console.log(questionList);
      console.log(questionDetails);
    }
  };

  return (
    <>
      <form>
        <Grid container className={styles.mainWrapper}>
          <Grid item md={3} xs={12}>
            <MenuList>
              <MenuItem onClick={handleContentChange('mainDetails')}>
                Main Details
              </MenuItem>
              <MenuItem onClick={handleContentChange('externalMedia')}>
                External Media
              </MenuItem>
            </MenuList>
          </Grid>
          <Grid item md={8} xs={12}>
            <Grid container>
              <Grid item md={12} xs={12}>
                <FormControl fullWidth component="fieldset">
                  {contentChange()}
                </FormControl>
              </Grid>
              {changeQuestion()}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
