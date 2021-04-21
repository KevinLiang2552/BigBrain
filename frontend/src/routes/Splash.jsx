import React from 'react';
import bigBrainImage from '../assets/bigBrain.png';
import styles from '../styles/splash.module.css';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import Image from 'material-ui-image';

export const SplashPage = () => {
  return (
    <>
      <Container className={styles.mainWrapper}>
        <Grid container justify={'center'} alignItems={'center'} spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Box className={styles.imageSplash}>
                    <Image src={bigBrainImage} alt={'big brain image'} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} className={styles.descriptionSplash}>
                  <div>
                    <Typography
                      paragraph
                      variant={'h1'}
                      className={styles.descriptionSplashHeader}>
                      BigBrain
                    </Typography>
                    <Typography
                      paragraph
                      variant={'h3'}
                      className={styles.descriptionSplashText}>
                      An innovative lightweight quiz platform for millenials
                      that will revolutionise the secondary and tertiary
                      education market for years.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justify={'center'} alignItems={'center'} spacing={2}>
          <Grid item xs={12} md={6} className={styles.authText}>
            <Paper className={styles.splashControls}>
              <Typography variant="h5">Want to create a quiz?</Typography>
              <Typography variant="subtitle1">
                Create a big brain account now!
              </Typography>
              <Box mt={2} className={styles.adminControls}>
                <Box mr={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={styles.controlsButton}>
                    <Link to="/login" className={styles.link}>
                      Login
                    </Link>
                  </Button>
                </Box>
                <Button variant="contained" color="secondary">
                  <Link to="/register" className={styles.link}>
                    Register
                  </Link>
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} className={styles.authText}>
            <Paper className={styles.splashControls}>
              <Typography variant="h5">Do you have a big brain?</Typography>
              <Typography variant="subtitle1">
                Join a quiz right now!
              </Typography>
              <Box mt={2}>
                <Button variant="contained" color="primary">
                  <Link to="/play" className={styles.link}>
                    Search for a game
                  </Link>
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
