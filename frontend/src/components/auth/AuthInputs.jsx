import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/auth.module.css';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import FeatherIcon from 'feather-icons-react';
import { capitalizeFirstLetter } from '../../helpers/authHelpers.js';

/**
 *  @param {string} type Name of the detail
 *  @param {function} handleFormChange Function for change in text (update state and errors)
 *  @param {boolean} error Set if the text field is in an error state
 *  @param {string} errorMessage Error message helper text
 */
export const DefaultInput = ({
  type,
  handleFormChange,
  error = false,
  errorMessage,
}) => {
  DefaultInput.propTypes = {
    type: PropTypes.string,
    handleFormChange: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
  };

  return (
    <TextField
      id={'input' + capitalizeFirstLetter(type)}
      className={styles.authInput}
      label={capitalizeFirstLetter(type)}
      error={error}
      helperText={errorMessage}
      onChange={handleFormChange(type)}
      variant="outlined"
    />
  );
};
/**
 *  @param {boolean} showPassword Determine state of show password
 *  @param {string} type Name of the detail
 *  @param {function} handleFormChange Function for change in text (update state and errors)
 *  @param {boolean} error Set if the text field is in an error state
 *  @param {string} errorMessage Error message helper text
 *  @param {boolean} confirPassword Differentiate between confirm password and password (as they have different labels and potentially future stuff)
 */
export const PasswordInput = ({
  showPassword,
  handleFormChange,
  handleShowPassword,
  error = false,
  errorMessage,
  confirmPassword = false,
}) => {
  // Define the prop types
  PasswordInput.propTypes = {
    showPassword: PropTypes.bool,
    handleFormChange: PropTypes.func,
    handleShowPassword: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    confirmPassword: PropTypes.bool,
  };

  return (
    <TextField
      id={confirmPassword ? 'inputConfirmPassword' : 'inputPassword'}
      className={styles.authInput}
      type={showPassword ? 'text' : 'password'}
      label={confirmPassword ? 'Confirm Password' : 'Password'}
      error={error}
      helperText={errorMessage}
      onChange={
        confirmPassword
          ? handleFormChange('confirmPassword')
          : handleFormChange('password')
      }
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={handleShowPassword()}
              edge="end"
              tabIndex="-1">
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
