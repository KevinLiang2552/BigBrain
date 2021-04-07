import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/dashboard.module.css';
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

  // Copys link to clipboard
  const handleCopyButton = () => {
    const linkBox = document.getElementById('linkBox');
    navigator.clipboard.writeText(linkBox.innerText);
  };

  return (
    <Dialog
      className={styles.quizModal}
      open={modalState}
      onClose={changeModalState}
      aria-labelledby={`${quiz.name} Quiz controls`}
      aria-describedby={`${quiz.name} quiz controls whic allows the admin to stop, advance the current quiz. Also has a link to the play screen`}>
      <DialogTitle>{`${quiz.name} quiz has started!`}</DialogTitle>
      <DialogContent className={styles.modalLinkWrapper}>
        <Typography id="linkBox" className={styles.linkBox}>
          {`localhost:3000/play/${quiz.id}`}
        </Typography>
        <CopyButton onClick={handleCopyButton}>Copy Link</CopyButton>
      </DialogContent>
    </Dialog>
  );
};
