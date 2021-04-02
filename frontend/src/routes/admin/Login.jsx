import React, { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { Link } from 'react-router-dom';
import { Box, Button, Container } from '@material-ui/core';
import API from '../../api/api.js';

import {
  DefaultInput,
  PasswordInput,
} from '../../components/auth/AuthInputs.jsx';

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
            <DefaultInput type="email" handleFormChange={handleFormChange} />
          </Box>
          <Box mt={2} mb={2}>
            <PasswordInput
              showPassword={details.showPassword}
              handleFormChange={handleFormChange}
              handleShowPassword={handleShowPassword}
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
