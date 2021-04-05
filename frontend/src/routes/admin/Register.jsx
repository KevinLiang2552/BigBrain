import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/auth.module.css';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, Container } from '@material-ui/core';
import API from '../../api/api.js';
import { DefaultInput } from '../../components/FormInputs.jsx';
import { PasswordInput } from '../../components/auth/AuthInputs.jsx';
import {
  checkEmailValid,
  isObjectValueEmpty,
} from '../../helpers/authHelpers.js';

// Register Page
export const RegisterPage = ({ setAuthToken }) => {
  RegisterPage.propTypes = {
    setAuthToken: PropTypes.func,
  };

  const api = new API('http://localhost:5005');
  const history = useHistory();

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
  const [registerError, setRegisterError] = useState('');

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
    setRegisterError('');

    const errorList = defaultErrors;

    if (details.name === '') {
      errorList.name = 'Name must not be empty';
    }

    if (details.email === '') {
      errorList.email = 'Email must not be empty';
    } else if (checkEmailValid(details.email) === null) {
      errorList.email = 'Email is not valid';
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
      const registerResult = await api.nonAuthorisedRequest(
        'POST',
        'admin/auth/register',
        {
          email: details.email,
          password: details.password,
          name: details.name,
        },
      );

      // If sucessful set token and move to dashboard else print error
      if (registerResult.status === 200) {
        setAuthToken(registerResult.data.token);
        history.push('/dashboard');
      } else {
        setRegisterError(registerResult.data.error);
        if (registerResult.data.error) {
          setErrors({ ...errors, email: 'Email address already registered' });
        }
      }
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
          <p className={styles.errorText}>{registerError}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister()}>
            Register
          </Button>
          <hr className={styles.authHR}></hr>

          <Link to="/login">
            <Button variant="outlined">Already a member?</Button>
          </Link>
        </form>
      </Container>
    </>
  );
};
