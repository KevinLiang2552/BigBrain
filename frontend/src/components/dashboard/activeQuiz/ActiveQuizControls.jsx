import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/components/activeQuiz.module.css';
import API from '../../../api/api.js';

import placeholderImage from '../../../assets/placeholderImage.png';
import { WhiteShadowTypography } from '../../CustomTypography.jsx';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import LinkIcon from '@material-ui/icons/Link';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import PersonIcon from '@material-ui/icons/Person';
import RefreshIcon from '@material-ui/icons/Refresh';

export const ActiveQuizControls = ({
  quiz,
  status,
  fetchSessionStatus,
  updateDashboardQuizzes,
  selectQuiz,
  setModalQuiz,
  changeModalState,
}) => {
  ActiveQuizControls.propTypes = {
    quiz: PropTypes.object,
    status: PropTypes.object,
    fetchSessionStatus: PropTypes.func,
    updateDashboardQuizzes: PropTypes.func,
    selectQuiz: PropTypes.func,
    setModalQuiz: PropTypes.func,
    changeModalState: PropTypes.func,
  };
  const api = new API('http://localhost:5005');

  useEffect(() => {
    // When the admin ends the quiz update the quiz state and display if the admin wants to see the results
    if (status.position === status.questions.length) {
      selectQuiz(-1);
      updateDashboardQuizzes();
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

  const getAdvanceButtonLabel = () => {
    let advanceButtonLabel = '';
    const position = status.position;
    const questionsLength = status.questions.length;

    if (position === -1) {
      advanceButtonLabel = 'Start Quiz';
    } else if (position === questionsLength - 1) {
      advanceButtonLabel = 'End Quiz';
    } else {
      advanceButtonLabel = 'Next Question';
    }

    return advanceButtonLabel;
  };

  const handleLink = () => {
    setModalQuiz(quiz);
    changeModalState();
  };

  const quizCardImage =
    quiz.thumbnail === null ? placeholderImage : quiz.thumbnail;

  const noSelected = quiz.id === -1;

  return (
    <Card>
      <CardMedia image={quizCardImage} className={styles.controlsImage}>
        <CardContent className={styles.controlsName}>
          <WhiteShadowTypography variant="h4">
            {quiz.name}
          </WhiteShadowTypography>
        </CardContent>
      </CardMedia>
      <CardContent>
        <Typography variant="h5">
          {noSelected
            ? 'Select one of the quizzes to use quiz controls'
            : `Status: ${getStatusLabel()}`}
        </Typography>
        <div className={styles.buttonWrapper}>
          <Button
            className={styles.buttons}
            size="large"
            variant="contained"
            disabled={noSelected}
            startIcon={<DoubleArrowIcon />}
            color="primary"
            onClick={handleAdvance}>
            {getAdvanceButtonLabel()}
          </Button>
          <Button
            className={styles.buttons}
            size="large"
            variant="contained"
            disabled={noSelected}
            startIcon={<StopIcon />}
            color="secondary"
            onClick={handleStopQuiz}>
            Stop Quiz
          </Button>
        </div>
        <div className={styles.playerHeading}>
          <Typography variant="h6">Player Names</Typography>
          <div className={styles.playerCount}>
            <Typography>{status.players.length}</Typography>
            <PersonIcon />
          </div>
          <IconButton
            disabled={noSelected}
            onClick={function () {
              fetchSessionStatus(quiz);
            }}>
            <RefreshIcon />
          </IconButton>
        </div>
        <div className={styles.playerListWrapper}>
          <List className={styles.playerList}>
            {status.players.map((player, index) => {
              return (
                <ListItem key={index}>
                  <ListItemText>{player}</ListItemText>
                </ListItem>
              );
            })}
          </List>
          <div className={styles.quizLink}>
            <Button
              startIcon={<LinkIcon />}
              onClick={handleLink}
              disabled={noSelected}>
              Quiz Link
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveQuizControls;
