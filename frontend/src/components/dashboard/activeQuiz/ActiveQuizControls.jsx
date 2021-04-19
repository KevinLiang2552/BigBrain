import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/components/activeQuiz.module.css';
import API from '../../../api/api.js';

import placeholderImage from '../../../assets/placeholderImage.png';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import LinkIcon from '@material-ui/icons/Link';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

export const ActiveQuizControls = ({
  quiz,
  status,
  fetchSessionStatus,
  updateDashboardQuizzes,
  selectQuiz,
}) => {
  ActiveQuizControls.propTypes = {
    quiz: PropTypes.object,
    status: PropTypes.object,
    fetchSessionStatus: PropTypes.func,
    updateDashboardQuizzes: PropTypes.func,
    selectQuiz: PropTypes.func,
  };
  const api = new API('http://localhost:5005');

  useEffect(() => {
    // When the admin ends the quiz update the quiz state and display if the admin wants to see the results
    if (status.position === status.questions.length) {
      // handleQuizResults();
      // updateQuiz();
      selectQuiz(-1);
      updateDashboardQuizzes();
      console.log('quizEnded');
    }
  }, [status]);

  // Get status label based on the position the quiz is currently in
  const getStatusLabel = () => {
    let positionLabel = '';
    const position = status.position;
    const questionsLength = status.questions.length;

    if (position === -1) {
      positionLabel = 'Lobby';
    } else if (position < questionsLength) {
      positionLabel = `Question  ${position + 1}: ${
        status.questions[position].question
      }`;
    } else {
      positionLabel = 'Results';
    }

    return positionLabel;
  };

  // Advance the current quiz
  const handleAdvance = async () => {
    const result = await api.authorisedRequest(
      'POST',
      `admin/quiz/${quiz.id}/advance`,
    );
    if (result.status === 200) {
      fetchSessionStatus(quiz);
    } else {
      console.log(result.data.error);
    }
  };

  // Stop the current quiz
  const handleStopQuiz = async () => {
    // TO DO VIEW RESULTS
    const stopQuizRes = await api.authorisedRequest(
      'POST',
      `admin/quiz/${quiz.id}/end`,
    );
    if (stopQuizRes.status === 200) {
      selectQuiz(-1);
      updateDashboardQuizzes();
    } else {
      console.log(stopQuizRes.data.error);
    }
  };

  const quizCardImage =
    quiz.thumbnail === null ? placeholderImage : quiz.thumbnail;

  return (
    <Card>
      <CardMedia image={quizCardImage} className={styles.controlsImage}>
        <CardContent className={styles.controlsName}>
          <Typography variant="h4">{quiz.name}</Typography>
        </CardContent>
      </CardMedia>
      <Typography>Status</Typography>
      <Typography>{getStatusLabel()}</Typography>
      <Button startIcon={<StopIcon />} onClick={handleStopQuiz}>
        Stop
      </Button>
      <Button startIcon={<DoubleArrowIcon />} onClick={handleAdvance}>
        Advance
      </Button>
      <Button startIcon={<LinkIcon />}>Quiz Link</Button>
    </Card>
  );
};

export default ActiveQuizControls;
