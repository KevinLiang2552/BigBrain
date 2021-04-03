import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/Header.module.css';
import { Box, Button } from '@material-ui/core';

export const Header = () => {
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
      </nav>
    </header>
  );
};
