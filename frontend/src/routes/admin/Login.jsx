import React, { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { Link } from 'react-router-dom';
import { Box, Button, Container } from '@material-ui/core';
import API from '../../api/api.js';
import { isObjectValueEmpty } from '../../helpers/authHelpers.js';
import { DefaultInput } from '../../components/FormInputs.jsx';
import { PasswordInput } from '../../components/auth/AuthInputs.jsx';

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
    setErrors(defaultErrors);

    const errorList = defaultErrors;

    if (details.email === '') {
      errorList.email = 'Email must not be empty';
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
          <Button variant="contained" color="primary" onClick={handleLogin()}>
            Log In
          </Button>
          <hr className={styles.authHR}></hr>

          <Link to="/register" className={styles.bottomText}>
            Not a member?
          </Link>
        </form>
      </Container>
    </>
  );
};
