import React from 'react';
import placeholdImage from '../assets/rushia_gotcha.jpg';
import styles from '../styles/splash.module.css';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import Image from 'material-ui-image';

export const SplashPage = () => {
  return (
    <>
      <Container className={styles.mainWrapper}>
        <Grid container justify={'center'} alignItems={'center'} spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper>
              <Image src={placeholdImage} alt={'placeholder image'} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography paragraph variant={'h1'}>
                BigBrain
              </Typography>
              <Typography paragraph variant={'h3'}>
                An innovative lightweight quiz platform for millenials that will
                revolutionise the secondary and tertiary education market for
                years.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justify={'center'} alignItems={'center'} spacing={2}>
          <Grid item xs={12} md={6} className={styles.authText}>
            <Paper>
              <div>Admin? Login or Register!</div>
              <Button variant="contained" color="primary">
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="contained" color="secondary">
                <Link to="/register">Register</Link>
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} className={styles.authText}>
            <Paper>
              <div>Player? Find your game here!</div>
              <Button variant="contained" color="primary">
                <Link to="/play">Search for a game</Link>
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
