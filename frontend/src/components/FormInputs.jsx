import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/auth.module.css';
import { TextField } from '@material-ui/core';
import { capitalizeFirstLetter } from '../helpers/authHelpers.js';

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
