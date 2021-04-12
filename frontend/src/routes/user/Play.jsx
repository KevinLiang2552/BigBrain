import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/play.module.css';
import API from '../../api/api.js';
import { useHistory, useParams } from 'react-router';
import { DefaultInput } from '../../components/FormInputs.jsx';
import { ErrorModal } from '../../components/ErrorModal.jsx';
import { Box, Button, Container } from '@material-ui/core';
import { isObjectValueEmpty } from '../../helpers/generalHelpers.js';

export const PlayPage = ({ setPlayerToken }) => {
  PlayPage.propTypes = {
    setPlayerToken: PropTypes.func,
  };

  const api = new API('http://localhost:5005');
  const { id } = useParams();
  const history = useHistory();

  // The required details for a game (session ID and player's name).
  const [gameDetails, setGameDetails] = useState({
    gameID: '',
    name: '',
  });

  // Any errors that the form might have.
  const defaultErrors = {
    gameID: '',
    name: '',
  };

  const [errors, setErrors] = useState(defaultErrors);

  // Any API errors to be displayed
  const defaultErrorModalState = {
    showModal: false,
    errorMessage: '',
  };

  const [modalState, setModalState] = useState(defaultErrorModalState);

  // Set game id value to id parameters on load
  useEffect(() => {
    if (id !== undefined) {
      setGameDetails({ ...gameDetails, gameID: id });
    }
  }, []);

  const handleFormChange = (type) => (event) => {
    setErrors({ ...errors, [type]: '' });
    setGameDetails({ ...gameDetails, [type]: event.target.value });
  };

  // Enter key event listner
  useEffect(() => {
    window.addEventListener('keydown', handleEnterKey());
  }, []);

  // Enter key submits form
  const handleEnterKey = () => (event) => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      document.getElementById('loginButton').click();
    }
  };

  const handleJoinGame = () => async () => {
    setErrors(defaultErrors);

    const errorList = defaultErrors;

    if (gameDetails.gameID === '') {
      errorList.gameID = 'GameID must not be empty';
    }

    if (gameDetails.name === '') {
      errorList.name = 'Name must not be empty';
    }

    if (!isObjectValueEmpty(errorList)) {
      setErrors({ gameID: errorList.gameID, name: errorList.name });
    } else {
      const joinResult = await api.nonAuthorisedRequest(
        'POST',
        `play/join/${gameDetails.gameID}`,
        {
          name: gameDetails.name,
        },
      );
      if (joinResult.status !== 200) {
        setModalState({
          showModal: true,
          errorMessage: joinResult.data.error,
        });
      } else {
        setPlayerToken(joinResult.data.playerId);
        console.log(joinResult);
        history.push(`${gameDetails.gameID}/lobby`);
      }
    }
  };

  return (
    <>
      <ErrorModal
        modalState={modalState.showModal}
        errorMessage={modalState.errorMessage}
        setModalState={setModalState}
      />
      <Container className={styles.playForm}>
        <Box>
          <form>
            <h1>Join a game</h1>
            <Box mt={2}>
              <DefaultInput
                type="gameID"
                handleFormChange={handleFormChange}
                error={errors.gameID !== ''}
                errorMessage={errors.gameID}
                defaultValue={id !== undefined ? id : ''}
              />
            </Box>
            <Box mt={2} mb={2}>
              <DefaultInput
                type="name"
                handleFormChange={handleFormChange}
                error={errors.name !== ''}
                errorMessage={errors.name}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleJoinGame()}>
              Search for game
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};
