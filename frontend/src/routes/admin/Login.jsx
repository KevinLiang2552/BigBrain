import React, { useEffect, useState } from 'react';
import styles from '../../styles/auth.module.css';
import { Link } from 'react-router-dom';
import { Box, Button, Container } from '@material-ui/core';
import API from '../../api/api.js';
import {
  checkEmailValid,
  isObjectValueEmpty,
} from '../../helpers/authHelpers.js';

import {
  DefaultInput,
  PasswordInput,
} from '../../components/auth/AuthInputs.jsx';

export const LoginPage = () => {
  const api = new API('http://localhost:5005');

  // Form details
  const [details, setDetails] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const defaultErrors = {
    email: '',
    password: '',
  };

  // Form errors message for each detail
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    window.addEventListener('keydown', handleEnterKey());
  }, []);

  // Enter key submits form
  const handleEnterKey = () => (event) => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      document.getElementById('loginButton').click();
    }
  };

  // After form inpuut change remove all errors on that input and update the details
  const handleFormChange = (type) => (event) => {
    setErrors({ ...errors, [type]: '' });
    setDetails({ ...details, [type]: event.target.value });
  };

  // Update if the password is shown or not
  const handleShowPassword = () => (event) => {
    setDetails({ ...details, showPassword: !details.showPassword });
  };

  // Handle the login and update relevant errors
  const handleLogin = () => async (event) => {
    console.log('HELLO');
    setErrors(defaultErrors);

    const errorList = defaultErrors;

    if (details.email === '') {
      errorList.email = 'Email must not be empty';
    } else if (checkEmailValid(details.email) === null) {
      errorList.email = 'Email is not valid';
    }

    if (details.password === '') {
      errorList.password = 'Password must not be empty';
    }

    if (!isObjectValueEmpty(errorList)) {
      setErrors({ email: errorList.email, password: errorList.password });
    } else {
      const loginResult = await api.nonAuthorisedRequest(
        'POST',
        'admin/auth/login',
        { email: details.email, password: details.password },
      );
      console.log(loginResult);
    }
  };

  return (
    <>
      <Container className={styles.mainBackground}>
        <form className={styles.authForm}>
          <h1>Login</h1>
          <Box mt={2}>
            <DefaultInput
              type="email"
              handleFormChange={handleFormChange}
              error={errors.email !== ''}
              errorMessage={errors.email}
            />
          </Box>
          <Box mt={2} mb={2}>
            <PasswordInput
              showPassword={details.showPassword}
              handleFormChange={handleFormChange}
              handleShowPassword={handleShowPassword}
              error={errors.password !== ''}
              errorMessage={errors.password}
            />
          </Box>
          <Button
            id="loginButton"
            variant="contained"
            color="primary"
            onClick={handleLogin()}>
            Log In
          </Button>
          <hr className={styles.authHR}></hr>

          <Link to="/register" className={styles.bottomText}>
            <Button variant="outlined">Not a member?</Button>
          </Link>
        </form>
      </Container>
    </>
  );
};
