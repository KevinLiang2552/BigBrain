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

/**
 * The brain of the explorer
 * Allows the admin to stop, advance and view players currently playing in the quiz
 * @param {object} quiz                             Quiz Data
 * @param {object} status                           Session data for current quiz
 * @param {function} fetchSessionStatus             Updates session status data
 * @param {function} updateDashboardQuizzes         Updates dashboard quizzes useState
 * @param {function} selectQuiz                     Select the current quiz we are selecting (used when stopping/ending a quiz)
 * @param {function} setModalQuiz                   Quiz link handling
 * @param {function} changeModalState               Quiz link handling
 * @returns
 */
export const ActiveQuizControls = ({
  quiz,
  status,
  fetchSessionStatus,
  updateDashboardQuizzes,
  selectQuiz,
  changeResultState,
  setLinkModalQuiz,
  changeLinkModalState,
  setResultIds,
}) => {
  ActiveQuizControls.propTypes = {
    quiz: PropTypes.object,
    status: PropTypes.object,
    fetchSessionStatus: PropTypes.func,
    updateDashboardQuizzes: PropTypes.func,
    selectQuiz: PropTypes.func,
    changeResultState: PropTypes.func,
    setLinkModalQuiz: PropTypes.func,
    changeLinkModalState: PropTypes.func,
    setResultIds: PropTypes.func,
  };
  const api = new API('http://localhost:5005');

  useEffect(() => {
    // When the admin ends the quiz update the quiz state and display if the admin wants to see the results
    if (status.position === status.questions.length) {
      setResultIds(quiz.id, quiz.active);
      selectQuiz(-1);
      updateDashboardQuizzes();
      changeResultState();
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
      setResultIds(quiz.id, quiz.active);
      selectQuiz(-1);
      updateDashboardQuizzes();
      changeResultState();
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
    setLinkModalQuiz(quiz);
    changeLinkModalState();
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
            name="acitveQuizAdvance"
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
            name="activeQuizStop"
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
            aria-label="refresh player list"
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
              name="activeQuizLink"
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
