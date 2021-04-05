import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/play.module.css';
import API from '../../api/api.js';
import { DefaultInput } from '../../components/FormInputs.jsx';
import { Box, Button, Container } from '@material-ui/core';
import { isObjectValueEmpty } from '../../helpers/authHelpers.js';

export const PlayPage = ({ setPlayerToken }) => {
  PlayPage.propTypes = {
    setPlayerToken: PropTypes.func,
  };

  const api = new API('http://localhost:5005');

  const [gameDetails, setGameDetails] = useState({
    gameID: '',
    name: '',
  });

  const defaultErrors = {
    gameID: '',
    name: '',
  };

  const [errors, setErrors] = useState(defaultErrors);

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
        console.log(joinResult.data.error);
      } else {
        setPlayerToken(joinResult.data.token);
        console.log(joinResult);
      }
    }
  };

  return (
    <>
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
              />
            </Box>
            <Box mt={2}>
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
