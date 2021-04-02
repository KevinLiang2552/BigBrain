import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/auth.module.css';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import FeatherIcon from 'feather-icons-react';
import { capitalizeFirstLetter } from '../../helpers/stringHelpers.js';

export const DefaultInput = ({ type, handleFormChange }) => {
  DefaultInput.propTypes = {
    type: PropTypes.string,
    handleFormChange: PropTypes.func,
  };

  return (
    <TextField
      id="loginEmail"
      className={styles.authInput}
      label={capitalizeFirstLetter(type)}
      onChange={handleFormChange({ type })}
      variant="outlined"
    />
  );
};

export const PasswordInput = ({
  showPassword,
  handleFormChange,
  handleShowPassword,
}) => {
  // Define the prop types
  PasswordInput.propTypes = {
    showPassword: PropTypes.bool,
    handleFormChange: PropTypes.func,
    handleShowPassword: PropTypes.func,
  };

  return (
    <TextField
      id="loginPassword"
      className={styles.authInput}
      type={showPassword ? 'text' : 'password'}
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
              {showPassword ? (
                <FeatherIcon icon="eye-off" />
              ) : (
                <FeatherIcon icon="eye" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
