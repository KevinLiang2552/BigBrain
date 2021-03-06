import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/auth.module.css';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, Container } from '@material-ui/core';
import API from '../../api/api.js';
import { DefaultInput, PasswordInput } from '../../components/FormInputs.jsx';
import { checkEmailValid } from '../../helpers/authHelpers.js';
import { isObjectValueEmpty } from '../../helpers/generalHelpers.js';

export const LoginPage = ({ setAuthToken }) => {
  LoginPage.propTypes = {
    setAuthToken: PropTypes.func,
  };

  const api = new API('http://localhost:5005');
  const history = useHistory();

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
  const [loginError, setLoginError] = useState('');

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
    event.preventDefault();
    setLoginError('');
    setErrors(defaultErrors);

    const errorList = defaultErrors;

    // Error checking
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

      // If sucessful set token and move to dashboard else print error
      if (loginResult.status === 200) {
        setAuthToken(loginResult.data.token);
        history.push('/dashboard');
      } else {
        setLoginError(loginResult.data.error);
      }
    }
  };

  return (
    <>
      <Container className={styles.mainBackground}>
        <form onSubmit={handleLogin()} className={styles.authForm}>
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
          <p className={styles.errorText}>{loginError}</p>
          <Box mb={1}>
            <Button
              name="login"
              id="loginButton"
              variant="contained"
              type="submit"
              color="primary">
              {/* // onClick={handleLogin}>  */}
              Log In
            </Button>
          </Box>
          <hr className={styles.authHR}></hr>
          <Box mt={1}>
            <Link to="/register" className={styles.bottomText}>
              <Button variant="outlined">Not a member?</Button>
            </Link>
          </Box>
        </form>
      </Container>
    </>
  );
};
