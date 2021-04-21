import React from 'react';
import PropTypes from 'prop-types';

import { Link, useHistory } from 'react-router-dom';
import styles from '../styles/components/Header.module.css';
import { Box, Button } from '@material-ui/core';

export const Header = ({ authToken, setAuthToken }) => {
  Header.propTypes = {
    authToken: PropTypes.string,
    setAuthToken: PropTypes.func,
  };

  const history = useHistory();
  // Reset auth token to empty
  const handleLogOut = () => {
    setAuthToken('');
    history.push('/');
  };

  return (
    <header className={styles.header}>
      <Box m={2}>
        <Button variant="contained" color="primary">
          <Link name="headerHome" className={styles.navLink} to="/">
            Home
          </Link>
        </Button>
      </Box>

      <nav className={styles.navBar}>
        {/* If not logged in show login and register button, else show log out */}
        {authToken === '' ? (
          <>
            <Box mr={1}>
              <Button name="headerLogin" variant="contained" color="primary">
                <Link to="/login">Login</Link>
              </Button>
            </Box>
            <Box mr={2}>
              <Link to="/register">
                <Button
                  name="headerRegister"
                  variant="contained"
                  color="secondary">
                  Register
                </Button>
              </Link>
            </Box>
          </>
        ) : (
          <Box mr={2}>
            <Button
              name="headerLogout"
              variant="contained"
              color="secondary"
              onClick={handleLogOut}>
              Log Out
            </Button>
          </Box>
        )}
      </nav>
    </header>
  );
};
