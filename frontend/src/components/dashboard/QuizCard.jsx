import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/dashboard.module.css';
import placeholderImage from '../../assets/placeholderImage.png';
import { useHistory } from 'react-router-dom';

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
import API from '../../api/api.js';

/**
 *
 * @param {object} quiz Quiz object with all value e.g. id, question
 * @param {function} deleteQuiz Delete quiz function
 */

export const QuizCard = ({ quiz, deleteQuiz }) => {
  QuizCard.propTypes = {
    quiz: PropTypes.object,
    deleteQuiz: PropTypes.func,
  };
  const api = new API('http://localhost:5005');
  const history = useHistory();

  const handleEdit = () => {
    history.push('/dashboard/edit/' + quiz.id);
  };

  const handleStartQuiz = async () => {
    const startQuizRes = await api.authorisedRequest(
      'POST',
      `admin/quiz/${quiz.id}/start`,
    );
    console.log(startQuizRes);
  };

  const handleStopQuiz = async () => {
    const startQuizRes = await api.authorisedRequest(
      'POST',
      `admin/quiz/${quiz.id}/end`,
    );
    console.log(startQuizRes);
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
              <Typography>Start</Typography>
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
