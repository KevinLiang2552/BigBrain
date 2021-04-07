import {
  Card,
  CardContent,
  CardMedia,
  Container,
  CircularProgress,
  Button,
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/edit.module.css';
import placeholderImage from '../../assets/placeholderImage.png';
import { useParams } from 'react-router';
import API from '../../api/api.js';
import { EditInput } from '../../components/FormInputs.jsx';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles';
import QuestionCard from '../../components/editQuiz/QuestionCard';
import { isObjectValueEmpty } from '../../helpers/generalHelpers.js';
import { AddQuestionModal } from '../../components/editQuiz/AddQuestionModal';

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
    answer: '',
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
    setQuestionDetails(defaultQuestionDetails);
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
      <AddQuestionModal
        modalState={modalState}
        closeModal={closeModal}
        handleAddQuestion={handleAddQuestion}
        questionDetails={questionDetails}
        setQuestionDetails={setQuestionDetails}
        errors={errors}
        setErrors={setErrors}
      />
    </Container>
  );
};
