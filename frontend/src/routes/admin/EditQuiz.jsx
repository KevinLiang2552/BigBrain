import {
  Card,
  CardContent,
  CardMedia,
  Container,
  CircularProgress,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Grid,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/edit.module.css';
import placeholderImage from '../../assets/placeholderImage.png';
import { useParams } from 'react-router';
import API from '../../api/api.js';
import { DefaultInput, EditInput } from '../../components/FormInputs.jsx';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles';
import QuestionCard from '../../components/editQuiz/QuestionCard';
import { isObjectValueEmpty } from '../../helpers/generalHelpers.js';

export const EditQuizPage = () => {
  const api = new API('http://localhost:5005');

  const { id } = useParams();

  const StyledButton = withStyles({
    root: {
      'background-color': '#5e60ce',
      color: 'white',
    },
  })(Button);

  const emptyDetails = {
    questions: [{}],
    createdAt: '',
    name: '',
    thumbnail: null,
    owner: '',
    active: null,
    oldSessions: [],
  };

  const defaultQuestionDetails = {
    id: 0,
    type: 'single',
    question: '',
    duration: 0,
    points: 0,
    answers: [],
    correctAnswers: [],
    imgSrc: null,
    vidSrc: null,
  };

  const defaultErrors = {
    question: '',
    duration: '',
    points: '',
    answers: '',
    correctAnswers: '',
  };

  const [quiz, setQuiz] = useState(emptyDetails);
  const [quizImage, setQuizImage] = useState(placeholderImage);
  const [imageButtonText, setImageButtonText] = useState('Upload Image');
  const [questionDetails, setQuestionDetails] = useState(
    defaultQuestionDetails,
  );
  const [questionList, setQuestionList] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(async () => {
    setQuizDetails(id);
  }, []);

  useEffect(() => {
    if (quiz.thumbnail !== null) {
      setQuizImage(quiz.thumbnail);
      setImageButtonText('Change Image');
    }
  }, [quiz]);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  // Get quiz details and set them
  const setQuizDetails = async (quizId) => {
    const quizDetailsRes = await api.authorisedRequest(
      'GET',
      `admin/quiz/${quizId}`,
    );
    if (quizDetailsRes.status === 200) {
      setQuiz(quizDetailsRes.data);
      setQuestionList(quizDetailsRes.data.questions);
    } else {
      console.log(quizDetailsRes.data.error);
    }
  };

  // Update name via API
  const handleNameUpdate = async (value) => {
    const updateNameRes = await api.authorisedRequest(
      'PUT',
      `admin/quiz/${id}`,
      { name: value },
    );

    if (updateNameRes.status === 200) {
      setQuizDetails(id);
    } else {
      console.log(updateNameRes.data.error);
    }
  };

  // Update image via API
  const handleImageUpdate = async (data) => {
    console.log(data);
    const updateImageRes = await api.authorisedRequest(
      'PUT',
      `admin/quiz/${id}`,
      {
        thumbnail: data,
      },
    );
    if (updateImageRes.status === 200) {
      setQuizDetails(id);
    } else {
      console.log(updateImageRes.data.error);
    }
  };

  const reader = new FileReader();

  reader.addEventListener('load', function () {
    handleImageUpdate(reader.result);
  });

  const handleImageUpload = () => {
    const imageUpload = document.getElementById('imageUpload');
    reader.readAsDataURL(imageUpload.files[0]);
  };

  const handleRadioChange = (event) => {
    setQuestionDetails({ ...questionDetails, type: event.target.value });
  };

  const handleFormChange = (type) => (event) => {
    setErrors({ ...errors, [type]: '' });
    setQuestionDetails({ ...questionDetails, [type]: event.target.value });
  };

  const handleAddQuestion = async (id) => {
    console.log('wah');
    console.log(questionDetails);
    setErrors(defaultErrors);

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
      console.log('wah2');
      errorList.points = 'Points must be a whole number';
    } else if (points <= 0) {
      errorList.points = 'Points has to be greater than 0';
    }

    if (!isObjectValueEmpty(errorList)) {
      setErrors(errorList);
    } else {
      setQuestionDetails(defaultQuestionDetails);
      setModalState(false);
    }
    /*
    const addQuestionRes = await api.authorisedRequest(
      'PUT',
      `admin/quiz/${id}`,
      { questions: questionList },
    );
    if (addQuestionRes.status === 200) {
      console.log('Successful delete of ' + id);
      setQuizDetails(id);
    } else {
      console.log(addQuestionRes.data.error);
    }
    */
  };

  const deleteQuestion = async (id) => {
    const deleteQuestionRes = await api.authorisedRequest(
      'PUT',
      `admin/quiz/${id}`,
      { questions: questionList },
    );
    if (deleteQuestionRes.status === 200) {
      console.log('Successful delete of ' + id);
      setQuizDetails(id);
    } else {
      console.log(deleteQuestionRes.data.error);
    }
  };

  return (
    <Container>
      {/* Details */}
      <Card className={styles.editDescription}>
        <CardContent className={styles.mainTitle}>
          <Typography variant="h5">Edit Quiz</Typography>
        </CardContent>
        {quizImage ? (
          <CardMedia
            image={quizImage}
            alt="Quiz Image"
            className={styles.editQuizImage}>
            <div className={styles.uploadButtonWrapper}>
              <Box mt={1} mr={1}>
                <input
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="imageUpload"
                  style={{ display: 'none' }}
                  type="file"
                />
                <label htmlFor="imageUpload">
                  <Button variant="contained" color="primary" component="span">
                    {imageButtonText}
                  </Button>
                </label>
              </Box>
            </div>
          </CardMedia>
        ) : (
          <CircularProgress />
        )}
        <CardContent>
          <EditInput
            type="Name"
            value={quiz.name}
            handleUpdate={handleNameUpdate}
          />
        </CardContent>
      </Card>
      {/* Questions */}
      <Grid container className={styles.questionWrapper}>
        <Grid item className={styles.questionHeading}>
          <Box mr={1}>
            <StyledButton
              className={styles.addQuestion}
              startIcon={<AddCircleIcon />}
              onClick={openModal}>
              Add Question
            </StyledButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="flex-start" alignItems="flex-start">
            {questionList.map((question, index) => {
              return (
                <QuestionCard
                  key={question.id}
                  question={question}
                  deleteQuiz={deleteQuestion}></QuestionCard>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
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
    </Container>
  );
};
