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

  // Hold quizzes from admin/quiz
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    getAdminQuizzes();
  }, []);

  // Get current user quizzes
  const getAdminQuizzes = async () => {
    const adminQuizRes = await api.authorisedRequest('GET', 'admin/quiz');

    if (adminQuizRes.status !== 200) {
      console.log(adminQuizRes.data.error);
      return;
    }
    const quizzes = adminQuizRes.data.quizzes;
    for (const quiz of quizzes) {
      const quizDetailsRes = await getQuizDetails(quiz.id);

      if (quizDetailsRes.status === null) {
        return;
      }

      quiz.questions = quizDetailsRes.questions;
    }

    setQuizzes(quizzes);
  };

  const getQuizDetails = async (quizId) => {
    const adminQuizRes = await api.authorisedRequest(
      'GET',
      `admin/quiz/${quizId}`,
    );
    if (adminQuizRes.status === 200) {
      return adminQuizRes.data;
    } else {
      console.log(adminQuizRes.data.error);
      return null;
    }
  };

  //  +++++++++++++++++++++++++++++++++++++++++++  CREATE NAME HANDLING

  // AnchorEl location of popover for create button
  const [createAnchorEl, setCreateAnchorEl] = useState(null);

  // When clicking on create button link popover to button
  const handleCreateButtonOpen = (event) => {
    setCreateAnchorEl(event.target);
  };

  // When closing popover unlink it from button and reset name values
  const handleCreateButtonClose = () => {
    setCreateAnchorEl(null);
    setCreateName('');
    setCreateNameError('');
  };

  // Create name useState
  const [createName, setCreateName] = useState('');
  const handleCreateNameChange = (event) => {
    setCreateName(event.target.value);
    setCreateNameError('');
  };

  const [createNameError, setCreateNameError] = useState('');

  // Create quiz with given name, show error if blank
  const handleCreateQuiz = async () => {
    if (createName === '') {
      setCreateNameError('Quiz name must not be blank');
    } else {
      const createQuizRes = await api.authorisedRequest(
        'POST',
        'admin/quiz/new',
        { name: createName },
      );
      if (createQuizRes.status === 200) {
        getAdminQuizzes();
      } else {
        setCreateNameError(createQuizRes.data.error);
      }
    }
  };

  //  +++++++++++++++++++++++++++++++++++++++++++  QUIZ CARD HANDLING

  const deleteQuiz = async (id) => {
    const deleteQuizRes = await api.authorisedRequest(
      'DELETE',
      `admin/quiz/${id}`,
    );
    if (deleteQuizRes.status === 200) {
      console.log('Successful delete of ' + id);
      getAdminQuizzes();
    } else {
      console.log(deleteQuizRes.data.error);
    }
  };

  return (
    <Container>
      <Grid container className={styles.dashboardWrapper}>
        <Grid item xs={12}>
          <Toolbar className={styles.dashboardHeader}>
            <Typography variant="h4"> Dashboard</Typography>

            <Button id="createButton" onClick={handleCreateButtonOpen}>
              <AddCircleIcon className={styles.createPlus} fontSize="default" />
              <Typography className={styles.createText}>Create Quiz</Typography>
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
                  onChange={handleCreateNameChange}
                  error={createNameError !== ''}
                  helperText={createNameError}
                  label="Quiz Name"></TextField>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleCreateQuiz}>
                  Create Quiz
                </Button>
              </div>
            </Popover>

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
              return (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  deleteQuiz={deleteQuiz}></QuizCard>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
