import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/components/activeQuiz.module.css';
import { useHistory } from 'react-router-dom';

import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';

/**
 *
 * @param {bool} modalState  State of modal true = visible, false = hidden
 * @param {object} quiz  Quiz object
 * @param {changeModalState} changeModalState  Flip the modalState
 * @returns
 */
export const ResultsModal = ({
  modalState,
  changeModalState,
  quiz,
  resultsIDs,
}) => {
  ResultsModal.propTypes = {
    modalState: PropTypes.bool,
    changeModalState: PropTypes.func,
    quiz: PropTypes.object,
    resultsIDs: PropTypes.object,
  };

  const history = useHistory();

  // Go to results page
  const gotoResultsPage = () => {
    history.push(
      `dashboard/pastResults/${resultsIDs.quizID}/${resultsIDs.sessionID}`,
    );
  };

  return (
    <Dialog
      className={styles.quizModal}
      open={modalState}
      onClose={changeModalState}
      aria-labelledby={`Quiz result popup`}
      aria-describedby={'Do you want to see the results of the quiz'}>
      <DialogTitle>{`Would you like to view the results?`}</DialogTitle>

      <DialogContent className={styles.modalLinkWrapper}>
        {/* Result modal */}

        <div className={styles.modalResultWrapper}>
          <Button
            name="yesResults"
            variant="contained"
            color="primary"
            className={styles.modalResultButton}
            onClick={gotoResultsPage}>
            Yes
          </Button>
          <Button
            name="noResults"
            variant="contained"
            color="secondary"
            className={styles.modalResultButton}
            onClick={changeModalState}>
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsModal;
