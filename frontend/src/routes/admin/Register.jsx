import React, { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { Link } from 'react-router-dom';
import { Box, Button, Container } from '@material-ui/core';
import API from '../../api/api.js';

import {
  DefaultInput,
  PasswordInput,
} from '../../components/auth/AuthInputs.jsx';

export const RegisterPage = () => {
  const api = new API('http://localhost:5005');

  const [details, setDetails] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    showPassword: false,
  });

  const handleFormChange = (type) => (event) => {
    setDetails({ ...details, [type]: event.target.value });
  };

  const handleShowPassword = () => (event) => {
    setDetails({ ...details, showPassword: !details.showPassword });
  };

  const handleRegister = () => async (event) => {
    if (details.confirmPassword !== details.password) {
      console.log('password have to be the same');
      return;
    }

    const loginResult = await api.nonAuthorisedRequest(
      'POST',
      'admin/auth/register',
      { email: details.email, password: details.password, name: details.name },
    );
    console.log(loginResult);
  };

  return (
    <>
      <Container className={styles.mainBackground}>
        <form className={styles.authForm}>
          <h1>Register</h1>
          <Box mt={2}>
            <DefaultInput type="name" handleFormChange={handleFormChange} />
          </Box>
          <Box mt={2}>
            <DefaultInput type="email" handleFormChange={handleFormChange} />
          </Box>
          <Box mt={2}>
            <PasswordInput
              showPassword={details.showPassword}
              handleFormChange={handleFormChange}
              handleShowPassword={handleShowPassword}
            />
          </Box>
          <Box mt={2} mb={2}>
            <PasswordInput
              showPassword={details.showPassword}
              handleFormChange={handleFormChange}
              handleShowPassword={handleShowPassword}
              confirmPassword={true}
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
