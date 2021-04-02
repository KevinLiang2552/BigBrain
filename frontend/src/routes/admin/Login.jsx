import React from 'react';
import styles from '../../styles/auth.module.css';
import { Link } from 'react-router-dom';
import { Box, Button, Container, TextField } from '@material-ui/core';

export const LoginPage = () => {
  return (
    <>
      <Container className={styles.mainBackground}>
        <form className={styles.authForm}>
          <h2>Login!</h2>
          <Box mt={2}>
            <TextField
              id="loginEmail"
              className={styles.authInput}
              label="Email"
              variant="outlined"
            />
          </Box>
          <Box mt={2} mb={2}>
            <TextField
              id="loginPassword"
              className={styles.authInput}
              label="Password"
              variant="outlined"
            />
          </Box>
          <Button variant="contained" color="primary">
            Log In
          </Button>
          <hr className={styles.authHR}></hr>

          <Link to="/register" className={styles.bottomText}>
            Already registered?
          </Link>
        </form>
      </Container>
    </>
  );
};
