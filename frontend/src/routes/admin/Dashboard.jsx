import React from 'react';
import { getAuthToken } from '../../helpers/user.js';
import {
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import styles from '../../styles/dashboard.module.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const DashboardPage = () => {
  console.log('GET' + getAuthToken());
  return (
    <Container>
      <Grid container className={styles.dashboardWrapper}>
        <Grid xs={12}>
          <Toolbar className={styles.dashboardHeader}>
            <Button className={styles.createButton}>
              <AddCircleIcon color="white" />
              <Typography>Create Quiz</Typography>
            </Button>
            <div>{/* Extension add sort quiz here */}</div>
          </Toolbar>
        </Grid>
        <Grid xs={12}>
          <div></div>
        </Grid>
      </Grid>
    </Container>
  );
};
