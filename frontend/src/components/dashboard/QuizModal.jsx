import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../../styles/dashboard.module.css';
import API from '../../api/api.js';
import { emptySessionStatus } from '../../helpers/emptyTypes.js';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
/**
 *
 * @param {bool} modalState  State of modal true = visible, false = hidden
 * @param {object} quiz  Quiz object
 * @param {changeModalState} changeModalState  Flip the modalState
 * @returns
 */
export const QuizModal = ({ modalState, quiz, changeModalState }) => {
  QuizModal.propTypes = {
    modalState: PropTypes.bool,
    quiz: PropTypes.object,
    changeModalState: PropTypes.func,
  };

  const CopyButton = withStyles({
    root: {
      background: 'linear-gradient(to right, #7400b8 70%, #6930c3 )',
      color: 'white',
      height: '37px',
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px',
    },
  })(Button);

  const api = new API('http://localhost:5005');

  const [sessionStatus, setSessionStatus] = useState(emptySessionStatus);

  useEffect(() => {
    if (quiz.active !== null) {
      getSessionStatus();
    }
  }, [quiz]);

  const getSessionStatus = async () => {
    const result = await api.authorisedRequest(
      'GET',
      `admin/session/${quiz.active}/status`,
    );
    if (result.status === 200) {
      setSessionStatus(result.data.results);
      console.log(sessionStatus);
    } else {
      console.log(result.data.error);
    }
  };

  const handleAdvance = async () => {
    // WIP WIP WIP
    // const result = await api.authorisedRequest(
    //   'POST',
    //   `admin/quiz/${quiz.id}/advance`,
    // );
    // if (result.status === 200) {
    //   getSessionStatus();
    // } else {
    //   console.log(result.data.error);
    // }
  };

  // Copys link to clipboard
  const handleCopyButton = () => {
    const linkBox = document.getElementById('linkBox');
    navigator.clipboard.writeText(linkBox.innerText);
    console.log(sessionStatus);
  };

  return (
    <Dialog
      className={styles.quizModal}
      open={modalState}
      onClose={changeModalState}
      aria-labelledby={`${quiz.name} Quiz controls`}
      aria-describedby={`${quiz.name} quiz link and advance controls`}>
      <DialogTitle>{`${quiz.name} quiz`}</DialogTitle>
      <DialogContent className={styles.modalLinkWrapper}>
        <Link to={`play/${quiz.active}`} target="_blank">
          <Typography id="linkBox" className={styles.linkBox}>
            {`localhost:3000/play/${quiz.active}`}
          </Typography>
        </Link>
        <CopyButton onClick={handleCopyButton}>Copy Link</CopyButton>
      </DialogContent>
      <DialogContent>
        <Typography>Position: {sessionStatus.position}</Typography>
        <Button color="primary" variant="contained" onClick={handleAdvance}>
          {sessionStatus.position > sessionStatus.questions.length - 1 ||
          sessionStatus.questions.length === 0
            ? 'End Quiz'
            : sessionStatus.position === -1
            ? 'Start Quiz'
            : 'Next Question'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
