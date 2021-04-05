import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/edit.module.css';
import placeholderImage from '../../assets/placeholderImage.png';
import { useParams } from 'react-router';
import API from '../../api/api.js';

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

  console.log(quiz);
  const quizImage = quiz.thumbnail === null ? placeholderImage : quiz.thumbnail;
  return (
    <Container>
      <Card className={styles.editDescription}>
        <CardMedia image={quizImage} className={styles.editQuizImage} />
        <CardContent>
          <Typography>{quiz.name}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
