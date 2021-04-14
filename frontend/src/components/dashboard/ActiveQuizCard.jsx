import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/dashboard.module.css';
import API from '../../api/api.js';
import { emptySessionStatus } from '../../helpers/emptyTypes.js';
import { withStyles } from '@material-ui/core/styles';

import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  List,
  Typography,
} from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import LinkIcon from '@material-ui/icons/Link';
import PersonIcon from '@material-ui/icons/Person';
import RefreshIcon from '@material-ui/icons/Refresh';

/**
 *
 * @param {object} quiz Quiz object with all value e.g. id, question
 * @param {function} setModalQuiz     Set quiz useState in dashboard to update modal
 * @param {function} changeModalState Change modal state (true or false)
 */
export const ActiveQuizCard = ({
  quizData,
  updateDashboardQuizzes,
  setModalQuiz,
  changeModalState,
}) => {
  ActiveQuizCard.propTypes = {
    quizData: PropTypes.object,
    updateDashboardQuizzes: PropTypes.func,
    setModalQuiz: PropTypes.func,
    changeModalState: PropTypes.func,
  };
  const api = new API('http://localhost:5005');

  // Quiz data
  const [quiz, setQuiz] = useState(quizData);

  // Session data (is quiz active or not, what players playing, what questions are in the quiz, position currrently in the quiz)
  const [sessionStatus, setSessionStatus] = useState(emptySessionStatus);

  useEffect(() => {
    getSessionStatus();
  }, [quiz]);

  useEffect(() => {
    console.log(sessionStatus);

    if (sessionStatus.position === sessionStatus.questions.length) {
      updateQuiz();
    }
  }, [sessionStatus]);

  const getSessionStatus = async () => {
    const result = await api.authorisedRequest(
      'GET',
      `admin/session/${quiz.active}/status`,
    );
    if (result.status === 200) {
      setSessionStatus(result.data.results);
    } else {
      console.log(result.data.error);
    }
  };

  const handleAdvance = async () => {
    const result = await api.authorisedRequest(
      'POST',
      `admin/quiz/${quiz.id}/advance`,
    );
    if (result.status === 200) {
      getSessionStatus();
    } else {
      console.log(result.data.error);
    }
  };

  // Get quiz data and updaate dashboard and quizcard quiz useState
  // Active property changes if active has an id otherwise it is null
  const updateQuiz = async () => {
    const quizRes = await api.authorisedRequest('GET', `admin/quiz/${quiz.id}`);
    if (quizRes.status === 200) {
      quizRes.data.id = quiz.id;
      setQuiz(quizRes.data);
      updateDashboardQuizzes();
    }
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

  const handleLink = () => {
    setModalQuiz(quiz);
    changeModalState();
  };

  // Get text value for the position the quiz is currently in
  const getPositionLabel = () => {
    let positionLabel = '';
    const position = sessionStatus.position;
    const questionsLength = sessionStatus.questions.length;

    if (position === -1) {
      positionLabel = 'Lobby';
    } else if (position < questionsLength) {
      positionLabel = `Question  ${position + 1}: ${
        sessionStatus.questions[position].question
      }`;
    } else {
      positionLabel = 'Results';
    }

    return positionLabel;
  };

  // Get text value for the advance button depending on the state
  const getAdvanceButtonLabel = () => {
    let advanceButtonLabel = '';
    const position = sessionStatus.position;
    const questionsLength = sessionStatus.questions.length;

    if (position === -1) {
      advanceButtonLabel = 'Start Quiz';
    } else if (position === questionsLength - 1) {
      advanceButtonLabel = 'End Quiz';
    } else {
      advanceButtonLabel = 'Next Question';
    }

    return advanceButtonLabel;
  };

  const PlayerList = withStyles({
    root: {
      overflowY: 'scroll',
      overflowX: 'hidden',
      width: '300px',
      height: '100px',
    },
  })(List);

  return (
    <Grid item xs={12}>
      <Card className={styles.activateQuizCard}>
        <Grid container>
          <Grid item xs={12} md={4} className={styles.activeQuizDetails}>
            <Box mb={2}>
              <Typography variant="h5">{quiz.name}</Typography>
            </Box>
            <div className={styles.activeQuizButtons}>
              <Box mr={1}>
                <Button
                  variant="contained"
                  startIcon={<LinkIcon />}
                  onClick={handleLink}>
                  <Typography>Quiz Link</Typography>
                </Button>
              </Box>
              <Button
                className={styles.activeQuizStop}
                variant="contained"
                startIcon={<StopIcon />}
                onClick={handleStopQuiz}>
                <Typography>Stop Quiz</Typography>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={4} className={styles.activeQuizPlayers}>
            <div className={styles.activePlayersHeading}>
              <Typography variant="h6">Players</Typography>
              <div className={styles.activePlayersDisplay}>
                <PersonIcon />
                <Typography>{sessionStatus.players.length}</Typography>
              </div>
              <IconButton onClick={getSessionStatus}>
                <RefreshIcon />
              </IconButton>
            </div>
            <PlayerList>
              {sessionStatus.players.length === 0 ? (
                <li>
                  <Typography>No players</Typography>
                </li>
              ) : (
                sessionStatus.players.map((player, index) => {
                  return (
                    <li key={index}>
                      <Typography>{player}</Typography>
                    </li>
                  );
                })
              )}
            </PlayerList>
          </Grid>
          <Grid item xs={12} md={4} className={styles.activeQuizStatus}>
            <Typography variant="h6">Status</Typography>
            <Typography>{getPositionLabel()}</Typography>
            <Box mt={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleAdvance}>
                {getAdvanceButtonLabel()}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ActiveQuizCard;
