import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/formInputs.module.css';
import {
  InputAdornment,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { capitalizeFirstLetter } from '../helpers/generalHelpers.js';
import FeatherIcon from 'feather-icons-react';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

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
      className={styles.textfield}
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
 *  @param {function} handleFormChange Function for change in text (update state and errors)
 *  @param {function} handleShowPassword Function that handle showPassword click
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
      className={styles.textfield}
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

/**
 *  @param {string} type Name of the detail
 *  @param {string} type Value of the detail
 *  @param {function} handleUpdate Function that will handle the api call to update the value (e.g. update the name)
 *  @param {boolean} error Set if the text field is in an error state
 *  @param {string} errorMessage Error message helper text
 */
export const EditInput = ({ type, value, handleUpdate }) => {
  EditInput.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    handleUpdate: PropTypes.func,
  };

  // Value of textfield
  const [inputValue, setInputValue] = useState(value);
  const [firstLoad, setfirstLoad] = useState(true);

  // Edit state
  const [editDisplay, setEditDisplay] = useState(false);

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  // Display of text or input
  const editing = editDisplay ? 'block' : 'none';
  const notEditing = editDisplay ? 'none' : 'block';

  // Aria label change
  const editButtonAriaLabel = editDisplay
    ? 'Cancel editing quiz name'
    : 'Edit quiz name';

  // Change state of edit
  const handleEditName = () => {
    if (editDisplay) {
      setInputValue(value);
      setError(false);
      setHelperText('');
      setEditDisplay(false);
    } else {
      setEditDisplay(true);
    }
  };

  // Change value textfield and input value
  const handleOnChange = () => {
    const textfield = document.getElementById('edit' + type);
    setfirstLoad(false);
    setInputValue(textfield.value);
  };

  // Handle confirm of change of value
  const handleConfirm = () => {
    if (inputValue === '' && !firstLoad) {
      setError(true);
      setHelperText('Name can not be empty');
    } else {
      setError(false);
      setHelperText('');
      setEditDisplay(false);
      handleUpdate(inputValue);
    }
  };

  return (
    <div className={styles.editTextWrapper}>
      <Typography style={{ display: notEditing }}>
        {inputValue === '' ? value : inputValue}
      </Typography>
      <TextField
        fullWidth
        error={error}
        helperText={helperText}
        id={'edit' + type}
        label={type}
        value={inputValue === '' && firstLoad ? value : inputValue}
        onChange={handleOnChange}
        className={styles.editInput}
        style={{ display: editing }}
      />
      <div className={styles.editButtonList}>
        <IconButton
          aria-label={editButtonAriaLabel}
          className={styles.editButton}
          onClick={handleEditName}>
          {editDisplay ? (
            <CloseIcon className={styles.editClose} />
          ) : (
            <EditIcon className={styles.editIcon} />
          )}
        </IconButton>
        <IconButton
          aria-label="Confirm new quiz name."
          className={styles.editButton}
          style={{ display: editing }}
          onClick={handleConfirm}>
          <CheckIcon className={styles.editCheck} />
        </IconButton>
      </div>
    </div>
  );
};
