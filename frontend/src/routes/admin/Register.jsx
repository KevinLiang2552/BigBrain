import React, { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { Link } from 'react-router-dom';
import { Box, Button, Container } from '@material-ui/core';
import API from '../../api/api.js';
import { isObjectValueEmpty } from '../../helpers/authHelpers.js';

import {
  DefaultInput,
  PasswordInput,
} from '../../components/auth/AuthInputs.jsx';

// Register Page
export const RegisterPage = () => {
  const api = new API('http://localhost:5005');

  // Form details
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const defaultErrors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  // Handle the register and update relevant errors
  const handleRegister = () => async (event) => {
    setErrors(defaultErrors);

    const errorList = defaultErrors;

    if (details.name === '') {
      errorList.name = 'Name must not be empty';
    }

    if (details.email === '') {
      errorList.email = 'Email must not be empty';
    }

    if (details.password === '') {
      errorList.password = 'Password must not be empty';
    }

    if (details.confirmPassword === '') {
      errorList.confirmPassword = 'Password must not be empty';
    }

    if (details.confirmPassword !== details.password) {
      errorList.confirmPassword = 'Passwords must match';
    }

    if (!isObjectValueEmpty(errorList)) {
      setErrors({
        email: errorList.email,
        password: errorList.password,
        name: errorList.name,
        confirmPassword: errorList.confirmPassword,
      });
    } else {
      const loginResult = await api.nonAuthorisedRequest(
        'POST',
        'admin/auth/register',
        {
          email: details.email,
          password: details.password,
          name: details.name,
        },
      );
      console.log(loginResult);
    }
  };

  return (
    <>
      <Container className={styles.mainBackground}>
        <form className={styles.authForm}>
          <h1>Register</h1>
          <Box mt={2}>
            <DefaultInput
              type="name"
              handleFormChange={handleFormChange}
              error={errors.name !== ''}
              errorMessage={errors.name}
            />
          </Box>
          <Box mt={2}>
            <DefaultInput
              type="email"
              handleFormChange={handleFormChange}
              error={errors.email !== ''}
              errorMessage={errors.email}
            />
          </Box>
          <Box mt={2}>
            <PasswordInput
              showPassword={details.showPassword}
              handleFormChange={handleFormChange}
              handleShowPassword={handleShowPassword}
              error={errors.password !== ''}
              errorMessage={errors.password}
            />
          </Box>
          <Box mt={2} mb={2}>
            <PasswordInput
              showPassword={details.showPassword}
              handleFormChange={handleFormChange}
              handleShowPassword={handleShowPassword}
              confirmPassword={true}
              error={errors.confirmPassword !== ''}
              errorMessage={errors.confirmPassword}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister()}>
            Register
          </Button>
          <hr className={styles.authHR}></hr>

          <Link to="/login" className={styles.bottomText}>
            Already a member?
          </Link>
        </form>
      </Container>
    </>
  );
};
