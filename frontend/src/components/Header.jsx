import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import styles from '../styles/components/Header.module.css';
import { Box, Button } from '@material-ui/core';

export const Header = ({ authToken, setAuthToken }) => {
  Header.propTypes = {
    authToken: PropTypes.string,
    setAuthToken: PropTypes.func,
  };

  // Reset auth token to empty
  const handleLogOut = () => {
    setAuthToken('');
  };

  return (
    <header className={styles.header}>
      <Box m={2}>
        <Button variant="contained" color="primary">
          <Link className={styles.navLink} to="/">
            Home
          </Link>
        </Button>
      </Box>

      <nav className={styles.navBar}>
        {/* If not logged in show login and register button, else show log out */}
        {authToken === '' ? (
          <>
            <Box mr={1}>
              <Button variant="contained" color="primary">
                <Link to="/login">Login</Link>
              </Button>
            </Box>
            <Box mr={2}>
              <Link to="/register">
                <Button variant="contained" color="secondary">
                  Register
                </Button>
              </Link>
            </Box>
          </>
        ) : (
          <Box mr={2}>
            <Link to="/" onClick={handleLogOut}>
              <Button variant="contained" color="secondary">
                Log Out
              </Button>
            </Link>
          </Box>
        )}
      </nav>
    </header>
  );
};
