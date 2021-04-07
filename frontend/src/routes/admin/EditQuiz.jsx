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

  useEffect(async () => {
    setQuizDetails(id);
  }, []);

  useEffect(() => {
    if (quiz.thumbnail !== null) {
      setQuizImage(quiz.thumbnail);
      setImageButtonText('Change Image');
    }
  }, [quiz]);

  // Get quiz details and set them
  const setQuizDetails = async (quizId) => {
    const quizDetailsRes = await api.authorisedRequest(
      'GET',
      `admin/quiz/${quizId}`,
    );
    if (quizDetailsRes.status === 200) {
      setQuiz(quizDetailsRes.data);
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
              startIcon={<AddCircleIcon />}>
              Add Question
            </StyledButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
