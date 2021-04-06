import {
  Card,
  CardContent,
  CardMedia,
  Container,
  CircularProgress,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/edit.module.css';
import placeholderImage from '../../assets/placeholderImage.png';
import { useParams } from 'react-router';
import API from '../../api/api.js';
import { EditInput } from '../../components/FormInputs.jsx';

export const EditQuizPage = () => {
  const api = new API('http://localhost:5005');

  const { id } = useParams();

  const emptyDetails = {
    questions: [{}],
    createdAt: '',
    name: '',
    thumbnail: '',
    owner: '',
    active: null,
    oldSessions: [],
  };

  const [quiz, setQuiz] = useState(emptyDetails);

  useEffect(async () => {
    setQuizDetails(id);
  }, []);

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

  const quizImage = quiz.thumbnail === null ? placeholderImage : quiz.thumbnail;
  return (
    <Container>
      <Card className={styles.editDescription}>
        {quizImage ? (
          <CardMedia
            image={quizImage}
            alt="Quiz Image"
            className={styles.editQuizImage}
          />
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
    </Container>
  );
};
