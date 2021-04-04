import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Popover,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import styles from '../../styles/dashboard.module.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import QuizCard from '../../components/dashboard/QuizCard.jsx';
import API from '../../api/api.js';

export const DashboardPage = () => {
  const api = new API('http://localhost:5005');

  const [quizzes, setQuizzes] = useState([]);
  useEffect(async () => {
    const adminQuizRes = await api.authorisedRequest('GET', 'admin/quiz');
    if (adminQuizRes.status === 200) {
      setQuizzes(adminQuizRes.data.quizzes);
    }
  }, []);

  const [createAnchorEl, setCreateAnchorEl] = useState(null);

  const handleCreateButtonOpen = (event) => {
    setCreateAnchorEl(event.target);
  };

  const handleCreateButtonClose = () => {
    setCreateAnchorEl(null);
  };

  const handleCreateQuiz = () => {};

  return (
    <Container>
      <Grid container className={styles.dashboardWrapper}>
        <Grid item xs={12}>
          <Toolbar className={styles.dashboardHeader}>
            <Typography variant="h4"> Dashboard</Typography>
            <div>
              <Button id="createButton" onClick={handleCreateButtonOpen}>
                <AddCircleIcon
                  className={styles.createPlus}
                  fontSize="default"
                />
                <Typography className={styles.createText}>
                  Create Quiz
                </Typography>
              </Button>
              <Popover
                open={Boolean(createAnchorEl)}
                onClose={handleCreateButtonClose}
                anchorEl={createAnchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}>
                <div className={styles.createPopover}>
                  <TextField
                    className={styles.createName}
                    label="Quiz Name"></TextField>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleCreateQuiz}>
                    Create Quiz
                  </Button>
                </div>
              </Popover>
            </div>
            {/* <div> Extension add sort quiz here</div> */}
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            className={styles.quizsWrapper}>
            {quizzes.map((quiz, index) => {
              return <QuizCard key={quiz.id} name={quiz.name}></QuizCard>;
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
