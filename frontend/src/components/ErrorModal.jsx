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
