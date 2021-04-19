import React, { useEffect, useState } from 'react';
import API from '../../api/api.js';
import styles from '../../styles/dashboard.module.css';

import { QuizModal } from '../../components/dashboard/QuizModal';
import { emptyQuizDetails,defaultErrorModalState } from '../../helpers/emptyTypes.js';
import QuizCard from '../../components/dashboard/QuizCard.jsx';
// import ActiveQuizCard from '../../components/dashboard/ActiveQuizCard.jsx';
import ActiveQuizExplorer from '../../components/dashboard/activeQuiz/ActiveQuizExplorer.jsx';
import ErrorModal from '../../components/ErrorModal.jsx';


import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Grid,
  Popover,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PublishIcon from '@material-ui/icons/Publish';

export const DashboardPage = () => {
  const api = new API('http://localhost:5005');

  // Hold quizzes from admin/quiz
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    updateDashboardQuizzes();
  }, []);

  // Get current user quizzes
  const updateDashboardQuizzes = async () => {
    const adminQuizRes = await api.authorisedRequest('GET', 'admin/quiz');

    if (adminQuizRes.status !== 200) {
      console.log(adminQuizRes.data.error);
      return;
    }

    const newQuizzes = adminQuizRes.data.quizzes;
    for (const quiz of newQuizzes) {
      const quizDetailsRes = await getQuizDetails(quiz.id);

      if (quizDetailsRes.status === null) {
        return;
      }

      quiz.questions = quizDetailsRes.questions;
    }

    setQuizzes(newQuizzes);
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

  //  +++++++++++++++++++++++++++++++++++++++++++  CREATE GAME HANDLING

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
        updateDashboardQuizzes();
      } else {
        setCreateNameError(createQuizRes.data.error);
      }
    }
  };

  //  +++++++++++++++++++++++++++++++++++++++++++  QUIZ CARD HANDLING

  const [modalState, setModalState] = useState(false);
  const [modalQuiz, setModalQuiz] = useState(emptyQuizDetails);

  const changeModalState = () => {
    setModalState(!modalState);
  };

  const childSetModalQuiz = (quiz) => {
    setModalQuiz(quiz);
  };

  const deleteQuiz = async (id) => {
    const deleteQuizRes = await api.authorisedRequest(
      'DELETE',
      `admin/quiz/${id}`,
    );
    if (deleteQuizRes.status === 200) {
      updateDashboardQuizzes();
    } else {
      console.log(deleteQuizRes.data.error);
    }
  };

<<<<<<< HEAD
  //  +++++++++++++++++++++++++++++++++++++++++++  UPLOAD GAME HANDLING

  // Tracks for displaying errors related to the upload
  const [errorModalState, setErrorModalState] = useState(
    defaultErrorModalState,
  );

  // File Reader for the file upload
  const reader = new FileReader();

  const handleUploadGame = () => {
    const gameUpload = document.getElementById('gameFileUpload');
    if (gameUpload.files[0] !== undefined)
      reader.readAsText(gameUpload.files[0]);
  };

  const uploadError = (errorMessage) => {
    setErrorModalState({
      showModal: true,
      errorMessage: errorMessage,
    });
  };

  // Main error checking logic for a file upload.
  reader.addEventListener('load', async () => {
    // Parse the data as a JSON file
    const gameData = JSON.parse(reader.result);
    let error = false;

    // Check if the game has a name
    if (gameData.name === undefined) {
      uploadError('Games must have a name.');
      error = true;
    }

    // Checks that the data of each question is valid

    // Users may upload an empty game with no questions
    if (gameData.questions.length > 0) {
      let questionCounter = 0;

      for (const question of gameData.questions) {
        // Check that a question object has a question
        if (question.question === undefined || question.question === '') {
          uploadError(`Question ${questionCounter + 1} is missing a name.`);
          error = true;
          break;
        }

        // Checks if the question has a proper type
        if (question.type === undefined || question.type === '') {
          uploadError(`Question ${questionCounter + 1} is missing a type.`);
          error = true;
          break;
        } else if (question.type !== 'single' && question.type !== 'multiple') {
          uploadError(`Question ${questionCounter + 1} has an invalid type.`);
          error = true;
          break;
        }

        // Checks if the question has a duration
        if (question.duration === undefined) {
          uploadError(`Question ${questionCounter + 1} is missing a duration.`);
          error = true;
          break;
        } else if (question.duration <= 0) {
          uploadError(
            `Question ${
              questionCounter + 1
            } must have a duration greater than 0.`,
          );
          error = true;
          break;
        }

        // Checks if the question has points
        if (question.points === undefined) {
          uploadError(
            `Question ${questionCounter + 1} is missing a points score.`,
          );
          error = true;
          break;
        } else if (question.points <= 0) {
          uploadError(
            `Question ${
              questionCounter + 1
            } must have points that are greater than 0.`,
          );
          error = true;
          break;
        }

        // Checks if the question has answers
        if (question.answers === undefined || question.answers.length === 0) {
          uploadError(`Question ${questionCounter + 1} is missing answers.`);
          error = true;
          break;
        } else if (question.answers.length > 6) {
          uploadError(
            `Question ${questionCounter + 1} cannot have more than 6 answers.`,
          );
          error = true;
          break;
        }

        // Checks if the question has correct answers
        if (
          question.correctAnswers === undefined ||
          question.correctAnswers.length === 0
        ) {
          uploadError(
            `Question ${questionCounter + 1} is missing correct answers.`,
          );
          error = true;
          break;
        } else {
          for (const correctAnswer of question.correctAnswers) {
            const foundAnswer = question.answers.find((answer) => {
              return answer.id === correctAnswer;
            });

            if (!foundAnswer) {
              uploadError(
                `Question ${
                  questionCounter + 1
                } has correct answers that do not exist.`,
              );
              error = true;
              break;
            }
          }
          if (error) break;
        }

        // Set the id for the question
        question.id = questionCounter;
        question.id === gameData.questions.length - 1
          ? (question.isLast = true)
          : (question.isLast = false);

        // Checks if an image or video url was given
        if (question.imgSrc === undefined) question.imgSrc = null;
        if (question.videoURL === undefined) question.videoURL = null;
        questionCounter++;
      }
    }

    if (!error) {
      // Create the game
      const createQuizRes = await api.authorisedRequest(
        'POST',
        'admin/quiz/new',
        { name: gameData.name },
      );
      if (createQuizRes.status === 200) {
        const quizID = createQuizRes.data.quizId;

        // Add the questions
        const addQuestionRes = await api.authorisedRequest(
          'PUT',
          `admin/quiz/${quizID}`,
          { questions: gameData.questions },
        );
        if (addQuestionRes.status === 200) {
          updateDashboardQuizzes();
        } else {
          uploadError(addQuestionRes.data.error);
        }
      } else {
        uploadError(createQuizRes.data.error);
      }
    }
  });
=======
  const [activeQuizzes, setActiveQuizzes] = useState([]);

  useEffect(() => {
    updateActiveQuizzes();
  }, [quizzes]);

  const updateActiveQuizzes = () => {
    const activeQuizzes = [];
    for (const quiz of quizzes) {
      if (quiz.active !== null) {
        activeQuizzes.push(quiz);
      }
    }
    console.log({ activeQuizzes });
    setActiveQuizzes(activeQuizzes);
  };
>>>>>>> 45806bd (add activeQuizExplorer skeleton)

  return (
    <Container>
      <QuizModal
        modalState={modalState}
        quiz={modalQuiz}
        changeModalState={changeModalState}
      />
      <Grid container className={styles.dashboardWrapper}>
        <Grid item xs={12}>
          <Toolbar className={styles.dashboardHeader}>
            <Grid container>
              <Grid item md={8} xs={8}>
                <Typography variant="h4"> Dashboard</Typography>
              </Grid>
              <Grid item md={2} xs={2}>
                <Button component="label">
                  <input
                    type="file"
                    onChange={handleUploadGame}
                    accept=".json, .csv"
                    id="gameFileUpload"
                    hidden
                  />
                  <PublishIcon
                    className={styles.createPlus}
                    fontSize="default"
                  />
                  <Typography className={styles.createText}>
                    Upload Game
                  </Typography>
                </Button>
              </Grid>
              <Grid item md={2} xs={2}>
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
              </Grid>
            </Grid>

            {/* <div> Extension add sort quiz here</div> */}
          </Toolbar>
        </Grid>

        {/* Active Quizzes */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="active quizzes">
              <Typography variant="h5">Active Quizzes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ActiveQuizExplorer
                quizzes={activeQuizzes}
                updateDashboardQuizzes={updateDashboardQuizzes}
              />
              {/* 
              <Grid container>
                {quizzes.map((quiz, index) => {
                  if (quiz.active !== null) {
                    return (
                      <ActiveQuizCard
                        key={quiz.id}
                        quizData={quiz}
                        updateDashboardQuizzes={updateDashboardQuizzes}
                        setModalQuiz={childSetModalQuiz}
                        changeModalState={changeModalState}></ActiveQuizCard>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </Grid> */}
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="My quizzes">
              <Typography variant="h5">My Quizzes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                justify="flex-start"
                alignItems="flex-start"
                className={styles.quizsWrapper}>
                {quizzes.map((quiz, index) => {
                  return (
                    <QuizCard
                      key={quiz.id}
                      quizData={quiz}
                      updateDashboardQuizzes={updateDashboardQuizzes}
                      setModalQuiz={childSetModalQuiz}
                      changeModalState={changeModalState}
                      deleteQuiz={deleteQuiz}></QuizCard>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <ErrorModal
        errorMessage={errorModalState.errorMessage}
        modalState={errorModalState.showModal}
        setModalState={setErrorModalState}
      />
    </Container>
  );
};
