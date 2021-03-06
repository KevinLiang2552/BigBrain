import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/play.module.css';
import API from '../../api/api.js';
import { useHistory, useParams } from 'react-router';
import { DefaultInput } from '../../components/FormInputs.jsx';
import { ErrorModal } from '../../components/ErrorModal.jsx';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { defaultErrorModalState } from '../../helpers/emptyTypes.js';
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

  const handleJoinGame = () => async (event) => {
    event.preventDefault();
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
      <Container>
        <form className={styles.playForm}>
          <Typography variant="h2">
            <b>Join a game</b>
          </Typography>
          <Box mt={5}>
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
            className={styles.joinButton}
            variant="contained"
            type="submit"
            color="primary"
            onClick={handleJoinGame()}>
            <Typography variant="h6">Join</Typography>
          </Button>
        </form>
      </Container>
    </>
  );
};
