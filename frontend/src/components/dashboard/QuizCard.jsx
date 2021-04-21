import React, { useEffect, useState } from 'react';
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
import BarChartIcon from '@material-ui/icons/BarChart';
import LinkIcon from '@material-ui/icons/Link';

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
  updateDashboardQuizzes,
  setModalQuiz,
  changeModalState,
}) => {
  QuizCard.propTypes = {
    quizData: PropTypes.object,
    updateDashboardQuizzes: PropTypes.func,
    deleteQuiz: PropTypes.func,
    setModalQuiz: PropTypes.func,
    changeModalState: PropTypes.func,
  };
  const history = useHistory();
  const api = new API('http://localhost:5005');

  const [quiz, setQuiz] = useState(quizData);

  useEffect(() => {
    setQuiz(quizData);
  }, [quizData]);

  // Get quiz data and updaate dashboard and quizcard quiz useState
  // Active property changes if active has an id otherwise it is null
  const updateQuiz = async () => {
    const quizRes = await api.authorisedRequest('GET', `admin/quiz/${quiz.id}`);
    if (quizRes.status === 200) {
      quizRes.data.id = quiz.id;
      setModalQuiz(quizRes.data);
      setQuiz(quizRes.data);
      updateDashboardQuizzes();
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
    } else {
      setModalQuiz(quiz);
    }
    changeModalState();
  };

  const handleShowPastResults = async () => {
    history.push(`/dashboard/pastResults/${quiz.id}`);
  };

  const handleEdit = () => {
    history.push('/dashboard/edit/' + quiz.id);
  };

  // Calculate and return how long the quiz will take to complete
  const getQuizDuration = () => {
    let seconds = 0;
    for (const question of quiz.questions) {
      seconds += parseInt(question.duration);
    }
    let durationString;
    if (seconds > 60) {
      const minutes = Math.ceil(seconds / 60);
      if (minutes > 60) {
        const hours = Math.ceil(minutes / 60);
        durationString = hours + ' hours';
      } else {
        durationString = minutes + ' minutes';
      }
    } else {
      durationString = seconds + ' seconds';
    }
    return durationString;
  };

  // const image
  const quizCardImage =
    quiz.thumbnail === null ? placeholderImage : quiz.thumbnail;

  return (
    <Grid item xs={12} md={4} className={styles.quizWrapper}>
      <Card className={styles.quizCard}>
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
              <Typography>{getQuizDuration()}</Typography>
            </div>
            <div className={styles.detail}>
              <QuestionAnswerIcon className={styles.detailIcon} />
              <Typography>{quiz.questions.length + ' questions'}</Typography>
            </div>
          </div>
          <div className={styles.controlsWrapper}>
            <Button
              name="startQuiz"
              className={`${styles.controls} ${styles.controlsPlay}`}
              startIcon={
                quiz.active !== null ? <LinkIcon /> : <PlayArrowIcon />
              }
              onClick={handleStartQuiz}>
              <Typography>
                {quiz.active !== null ? 'Quiz Link' : 'Start'}
              </Typography>
            </Button>
            <Button
              className={`${styles.controls} ${styles.controlsStop}`}
              startIcon={<BarChartIcon />}
              onClick={handleShowPastResults}>
              <Typography variant="button">Past Results</Typography>
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
