import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

/***
 * @param {string} errorMessage What the error message should show
 * @param {boolean} modalState Whether the modals is displayed or not
 * @param {function} setModalState To set the state of the modal display
 */

export const ErrorModal = ({ errorMessage, modalState, setModalState }) => {
  ErrorModal.propTypes = {
    errorMessage: PropTypes.string,
    modalState: PropTypes.bool,
    setModalState: PropTypes.func,
  };

  const toggleModal = () => {
    setModalState({ showModal: !modalState });
  };

  return (
    <>
      <Dialog
        open={modalState}
        onClose={toggleModal}
        aria-labelledby="error modal"
        aria-describedby="modal for errors">
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
