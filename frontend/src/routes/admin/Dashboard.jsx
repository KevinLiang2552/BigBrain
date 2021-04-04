import React, { useEffect } from 'react';
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
import QuizCard from '../../components/dashboard/QuizCard.jsx';

useEffect(() => {}, []);

export const DashboardPage = () => {
  console.log('GET' + getAuthToken());
  return (
    <Container>
      <Grid container className={styles.dashboardWrapper}>
        <Grid xs={12}>
          <Toolbar className={styles.dashboardHeader}>
            <Typography variant="h4"> Dashboard</Typography>
            <Button>
              <AddCircleIcon className={styles.createPlus} fontSize="medium" />
              <Typography className={styles.createText}>Create Quiz</Typography>
            </Button>
            {/* <div> Extension add sort quiz here</div> */}
          </Toolbar>
        </Grid>
        <Grid xs={12}>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            className={styles.quizsWrapper}>
            <QuizCard></QuizCard>
            <QuizCard></QuizCard>
            <QuizCard></QuizCard>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
