import React, { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  InputAdornment,
  IconButton,
  TextField,
} from '@material-ui/core';
import FeatherIcon from 'feather-icons-react';
import API from '../../api/api.js';

export const LoginPage = () => {
  const api = new API('http://localhost:5005');

  const [details, setDetails] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleFormChange = (type) => (event) => {
    setDetails({ ...details, [type]: event.target.value });
  };

  const handleShowPassword = () => (event) => {
    setDetails({ ...details, showPassword: !details.showPassword });
  };

  const handleLogin = () => async (event) => {
    const loginResult = await api.nonAuthorisedRequest(
      'POST',
      'admin/auth/login',
      { email: details.email, password: details.password },
    );
    console.log(loginResult);
  };

  return (
    <>
      <Container className={styles.mainBackground}>
        <form className={styles.authForm}>
          <h1>Login</h1>
          <Box mt={2}>
            <TextField
              id="loginEmail"
              type="email"
              className={styles.authInput}
              label="Email"
              onChange={handleFormChange('email')}
              variant="outlined"
            />
          </Box>
          <Box mt={2} mb={2}>
            <TextField
              id="loginPassword"
              className={styles.authInput}
              type={details.showPassword ? 'text' : 'password'}
              label="Password"
              onChange={handleFormChange('password')}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleShowPassword()}
                      edge="end">
                      {details.showPassword ? (
                        <FeatherIcon icon="eye-off" />
                      ) : (
                        <FeatherIcon icon="eye" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={handleLogin()}>
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
