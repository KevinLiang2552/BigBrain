import React from 'react';
import { Link } from 'react-router-dom';
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
import FileCopyIcon from '@material-ui/icons/FileCopy';

/**
 *
 * @param {bool} modalState  State of modal true = visible, false = hidden
 * @param {object} quiz  Quiz object
 * @param {changeModalState} changeModalState  Flip the modalState
 * @returns
 */
export const QuizModal = ({
  modalState,
  quiz,
  changeModalState,
  results = false,
}) => {
  QuizModal.propTypes = {
    modalState: PropTypes.bool,
    quiz: PropTypes.object,
    changeModalState: PropTypes.func,
    results: PropTypes.bool,
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

  // Go to results page
  const gotoResultsPage = () => {
    console.log('TODO GO TO RESULTS PAGE');
  };

  return (
    <Dialog
      className={styles.quizModal}
      open={modalState}
      onClose={changeModalState}
      aria-labelledby={results ? `Quiz result popup` : ` Quiz link popup`}
      aria-describedby={
        results
          ? `Do you want to see the results of the quiz`
          : ` A link to the quiz`
      }>
      <DialogTitle>
        {results
          ? `Do you want to see quiz ${quiz.name} results`
          : `${quiz.name} link`}
      </DialogTitle>

      <DialogContent className={styles.modalLinkWrapper}>
        {/* Result modal */}
        {results ? (
          <div className={styles.modalResultWrapper}>
            <Button
              variant="contained"
              color="primary"
              className={styles.modalResultButton}
              onClick={gotoResultsPage}>
              Yes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={styles.modalResultButton}
              onClick={changeModalState}>
              No
            </Button>
          </div>
        ) : (
          <>
            <Link to={`play/${quiz.active}`} target="_blank">
              <Typography id="linkBox" className={styles.linkBox}>
                {`localhost:3000/play/${quiz.active}`}
              </Typography>
            </Link>
            <CopyButton startIcon={<FileCopyIcon />} onClick={handleCopyButton}>
              Copy Link
            </CopyButton>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
