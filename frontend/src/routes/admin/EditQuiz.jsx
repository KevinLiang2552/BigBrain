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

  const [quiz, setQuiz] = useState(emptyDetails);
  const [quizImage, setQuizImage] = useState(placeholderImage);
  const [imageButtonText, setImageButtonText] = useState('Upload Image');
  const [questionList, setQuestionList] = useState([]);
  const [modalState, setModalState] = useState(false);

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

  // Get quiz details and set them
  const setQuizDetails = async (quizId) => {
    const quizDetailsRes = await api.authorisedRequest(
      'GET',
      `admin/quiz/${quizId}`,
    );
    if (quizDetailsRes.status === 200) {
      setQuiz(quizDetailsRes.data);
      setQuestionList(quizDetailsRes.data.questions);
      console.log(quizDetailsRes.data.questions);
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

  const handleImageUpload = async () => {
    const imageUpload = document.getElementById('imageUpload');
    reader.readAsDataURL(imageUpload.files[0]);
  };

  // Function for deleting questions and resetting ids of questions.
  const handleDeleteQuestion = (questionID) => async () => {
    const filteredQuestion = questionList.filter(
      (question) => question.id !== questionID,
    );

    for (const i in filteredQuestion) {
      filteredQuestion[i].id = parseInt(i);
    }

    if (questionList[questionID].isLast === true)
      filteredQuestion[filteredQuestion.length - 1].isLast = true;

    const addQuestionRes = await api.authorisedRequest(
      'PUT',
      `admin/quiz/${id}`,
      { questions: filteredQuestion },
    );
    if (addQuestionRes.status === 200) {
      setQuizDetails(id);
    } else {
      console.log(addQuestionRes.data.error);
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
              <Box mt={1} mr={1} xs={1}>
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
          <Grid container spacing={2}>
            {questionList.map((question, index) => {
              return (
                <Grid key={index} item md={12} xs={12}>
                  <QuestionCard
                    question={question}
                    deleteQuestion={handleDeleteQuestion}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <AddQuestionModal
        quizID={id}
        questionList={questionList}
        modalState={modalState}
        setModalState={setModalState}
        setQuizDetails={setQuizDetails}
      />
    </Container>
  );
};
