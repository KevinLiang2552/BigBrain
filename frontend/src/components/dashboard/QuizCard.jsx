import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/dashboard.module.css';
import placeholderImage from '../../assets/placeholderImage.png';
import { useHistory } from 'react-router-dom';
import API from '../../api/api.js';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EditIcon from '@material-ui/icons/Edit';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

/**
 *
 * @param {object} quiz Quiz object with all value e.g. id, question
 * @param {function} deleteQuiz Delete quiz function
 * @param {function} setModalQuiz     Set quiz useState in dashboard to update modal
 * @param {function} changeModalState Change modal state (true or false)
 */
export const QuizCard = ({
  quizData,
  deleteQuiz,
  setModalQuiz,
  changeModalState,
}) => {
  QuizCard.propTypes = {
    quizData: PropTypes.object,
    deleteQuiz: PropTypes.func,
    setModalQuiz: PropTypes.func,
    changeModalState: PropTypes.func,
  };
  const history = useHistory();
  const api = new API('http://localhost:5005');

  const [quiz, setQuiz] = useState(quizData);

  // Get quiz data and updaate dashboard and quizcard quiz useState
  const updateQuiz = async () => {
    const quizRes = await api.authorisedRequest('GET', `admin/quiz/${quiz.id}`);
    if (quizRes.status === 200) {
      quizRes.data.id = quiz.id;
      setModalQuiz(quizRes.data);
      setQuiz(quizRes.data);
    }
  };

  // Handle start button
  // Start quiz if not active, and shows quiz modal
  const handleStartQuiz = async () => {
    if (quiz.active === null) {
      const startQuizRes = await api.authorisedRequest(
        'POST',
        `admin/quiz/${quiz.id}/start`,
      );

      if (startQuizRes.status === 200) {
        updateQuiz(quiz);
      } else {
        console.log(startQuizRes.data.error);
      }
    }
    changeModalState();
  };

  // Stop current quiz session
  const handleStopQuiz = async () => {
    // TO DO VIEW RESULTS

    const stopQuizRes = await api.authorisedRequest(
      'POST',
      `admin/quiz/${quiz.id}/end`,
    );

    if (stopQuizRes.status === 200) {
      updateQuiz();
    } else {
      console.log(stopQuizRes.data.error);
    }
  };

  const handleEdit = () => {
    history.push('/dashboard/edit/' + quiz.id);
  };

  // const image
  const quizCardImage =
    quiz.thumbnail === null ? placeholderImage : quiz.thumbnail;

  return (
    <Grid item xs={12} md={4} className={styles.quizWrapper}>
      <Card className={styles.quizCard}>
        <div className={styles.quizz}></div>
        <CardMedia className={styles.quizImage} image={quizCardImage}>
          <div className={styles.deleteWrapper}>
            <IconButton
              className={styles.deleteButton}
              onClick={function () {
                deleteQuiz(quiz.id);
              }}>
              <DeleteIcon className={styles.deleteIcon} />
            </IconButton>
          </div>
        </CardMedia>
        <CardContent>
          <Typography variant="h6">{quiz.name}</Typography>
          <div className={styles.detailWrapper}>
            <div className={styles.detail}>
              <AccessTimeIcon className={styles.detailIcon} />
              <Typography>10 mins</Typography>
            </div>
            <div className={styles.detail}>
              <QuestionAnswerIcon className={styles.detailIcon} />
              <Typography>{quiz.questions.length + ' questions'}</Typography>
            </div>
          </div>

          <div className={styles.controlsWrapper}>
            <Button
              className={`${styles.controls} ${styles.controlsPlay}`}
              startIcon={<PlayArrowIcon />}
              onClick={handleStartQuiz}>
              <Typography>
                {quiz.active !== null ? 'Active' : 'Start'}
              </Typography>
            </Button>
            <Button
              className={`${styles.controls} ${styles.controlsStop}`}
              startIcon={<StopIcon />}
              onClick={handleStopQuiz}>
              <Typography>Stop</Typography>
            </Button>
            <Button
              className={`${styles.controls} ${styles.controlsEdit}`}
              startIcon={<EditIcon />}
              onClick={handleEdit}>
              <Typography>Edit</Typography>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default QuizCard;
