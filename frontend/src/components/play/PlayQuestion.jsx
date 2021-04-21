import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../api/api.js';
import { getPlayerToken } from '../../helpers/user.js';
import { getQuestionPoints } from '../../helpers/generalHelpers.js';
import styles from '../../styles/play.module.css';

import { Box, Container, Grid, Typography } from '@material-ui/core';

import PlayQuestionButton from './PlayQuestionButton.jsx';
import PlayerQuizResults from './PlayerQuizResults.jsx';
import QuestionMediaBar from './QuestionMediaBar.jsx';
import SubmitButton from './SubmitButton.jsx';
import QuizTimer from './QuizTimer.jsx';
import PlayQuestionResult from './PlayQuestionResult.jsx';
import WhiteTypography from '../CustomTypography.jsx';

/**
 *
 * @param {object} questionData The question's data (name, answers, etc...)
 * @returns
 */
export const PlayQuestion = ({
  questionData,
  pageForNewQuestion,
  addPoints,
  totalPoints,
}) => {
  PlayQuestion.propTypes = {
    questionData: PropTypes.object,
    pageForNewQuestion: PropTypes.func,
    addPoints: PropTypes.func,
    totalPoints: PropTypes.number,
  };

  const api = new API('http://localhost:5005');

  // Question use state
  const [question, setQuestion] = useState(questionData);

  // Answers of the current quesiton
  const [questionAnswerIds, setQuestionAnswerIds] = useState([]);

  // Players answers of the current question
  const [playerAnswerIds, setPlayerAnswerIds] = useState([]);

  // Player has submitted their answer
  const [playerSubmit, setPlayerSubmit] = useState(false);

  // The amount of time left for the question
  const [timeLeft, setTimeLeft] = useState(questionData.duration);

  // Timer interval (the interval that ticks every second)
  const [timer, setTimer] = useState(-1);

  // The amount of time left when the player answered
  const [timeAnswered, setTimeAnswered] = useState(-1);

  // Funny Text
  const [speedText, setSpeedText] = useState('');

  // Current points the player can earn for the current question
  const [currentPoints, setCurrentPoints] = useState(0);

  // The players results
  const [playerResults, setPlayerResults] = useState(null);

  // Set default value when question data changes
  useEffect(() => {
    setQuestion(questionData);
    setTimeAnswered(-1);
    setQuestionAnswerIds([]);
    setPlayerAnswerIds([]);
    setPlayerSubmit(false);
    getCurrentTimeLeft();
    startTimer();
  }, [questionData]);

  // ⏲️ Timer Logic  ⏲️

  // When time has run out end the question
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      getAnswer();
      pageForNewQuestion();
    }
  }, [timeLeft]);

  // Clean up
  useEffect(() => {
    return () => {
      if (timeLeft > 0) {
        clearInterval(timer);
      }
    };
  }, []);

  // Set time left depending on when the question started
  // 1 second lag delay leway for loading issues
  const getCurrentTimeLeft = () => {
    const startTime = new Date(questionData.isoTimeLastQuestionStarted);
    const currentTime = new Date();

    // currentTime - startTime, returns the amount of millisecond difference
    // Note this most likely doesnt work if timezones are different!
    const secondsSinceStart = Math.floor((currentTime - startTime) / 1000);
    const lagDelay = 1;

    if (secondsSinceStart > questionData.duration + lagDelay) {
      setTimeLeft(0);
    } else if (secondsSinceStart >= 1) {
      setTimeLeft(questionData.duration - secondsSinceStart + lagDelay);
    } else {
      setTimeLeft(questionData.duration);
    }
  };

  // Start quiz timer, reduce time left by 1 each second
  const startTimer = () => {
    if (timer !== -1) {
      clearInterval(timer);
    }
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    setTimer(interval);
  };

  // 🙋 Handling answers and educated guesses  🙋

  // Get the answer for the current question. [Called in timeLeft useEffect]
  // Store value in questionAnswersIds
  const getAnswer = async () => {
    const res = await api.authorisedRequest(
      'GET',
      `play/${getPlayerToken()}/answer`,
    );
    if (res.status === 200) {
      setQuestionAnswerIds(res.data.answerIds);
    } else {
      console.log(res.data.error);
    }
  };

  // isPlayerCorrect is based off questionAnswerids, so we have to wait for it to be set
  // As points are calculated off the time left we store the value first, then add it after (only if the player is correct)
  useEffect(() => {
    if (questionAnswerIds.length > 0 && isPlayerCorrect()) {
      addPoints(currentPoints);
    }
  }, [questionAnswerIds]);

  /**
   * When a user presses a answer button, the answer is id is passed down to this function
   * If the playerAnswerIds list does not contain the id it will add it to the list
   * If the playerAnswerIds list does contain the id it will delete it from the list
   *
   * For a question.type: single, the first time this function is called it will immeaditely called putAnswers
   * For a question.type: multiple, it only adds the id to the list
   * @param {*} id id of answer
   */
  const handleQuestionClick = (id) => {
    // Remove answer from list if already in the list for a multiple type question
    if (playerAnswerIds.includes(id) && question.type === 'multiple') {
      const index = playerAnswerIds.indexOf(id);
      playerAnswerIds.splice(index, 1);
    } else {
      playerAnswerIds.push(id);
    }
    if (question.type === 'single') {
      putAnswers(playerAnswerIds);
    }
  };

  // For question.type: multiple a submit button is given which submits the answers
  const handleSubmitAnswers = () => {
    putAnswers(playerAnswerIds);
  };

  // First sends playerAnswersIds to API with player answers
  // Activates "funny" text telling the user how faast they were
  // Calculate the amount of potential points the player can win
  // Note it is multiplied by 100 to make it seem like points matter, but they really don't 😔
  const putAnswers = async () => {
    const res = await api.authorisedRequest(
      'PUT',
      `play/${getPlayerToken()}/answer`,
      { answerIds: playerAnswerIds },
    );
    if (res.status !== 200) {
      console.log(res.data.error);
    } else {
      setPlayerSubmit(true);

      setFunnyText();
      setTimeAnswered(timeLeft);

      const questionPoints = getQuestionPoints(
        question.points,
        timeLeft,
        question.duration,
      );

      setCurrentPoints(questionPoints);
    }
  };

  // Set text for when the player answers the question after a certain time period
  const setFunnyText = () => {
    const howFast = Math.ceil((timeLeft / question.duration) * 10);

    let speedText =
      'You are legit a timelord, how did you managed to get more time';
    if (howFast === 10) {
      speedText =
        'Are you even looking at the question? Or are you a goddamn genius!';
    } else if (howFast === 9 || howFast === 8) {
      speedText = 'You are a speeed demon';
    } else if (howFast === 7 || howFast === 6) {
      speedText = 'Nice and quick';
    } else if (howFast === 5 || howFast === 4) {
      speedText = 'Giving it some thought can go a long way!';
    } else if (howFast === 3 || howFast === 2) {
      speedText = 'Cutting it close!';
    } else if (howFast === 1) {
      speedText = 'Jussttt in the nick of time';
    }
    setSpeedText(speedText);
  };

  /**
   *
   * @returns {bool} return if the player has the correct answer/s for the current question
   */
  const isPlayerCorrect = () => {
    if (!playerSubmit) {
      return false;
    }
    // If answers are not the same amount it is obviously not correct
    if (playerAnswerIds.length !== questionAnswerIds.length) {
      return false;
    }

    // As answers can only have the same length, check if play ids does include every question id
    let correct = true;
    for (const questionAnswer of questionAnswerIds) {
      if (!playerAnswerIds.includes(questionAnswer)) {
        correct = false;
        break;
      }
    }

    return correct;
  };

  // Get the answer text of the current question to display on the result question
  // To show what the correct answer is.
  const getQuestionAnswersText = () => {
    const answersText = [];
    for (const questionAnswer of question.answers) {
      if (questionAnswerIds.includes(questionAnswer.id)) {
        answersText.push(questionAnswer.answer);
      }
    }
    return answersText;
  };

  // Get the quiz results
  const getQuizResult = async () => {
    const res = await api.authorisedRequest(
      'GET',
      `play/${getPlayerToken()}/results`,
    );
    if (res.status === 200) {
      setPlayerResults(res.data);
    }
  };

  // Render the play question screen
  const renderPlayQuestion = () => {
    // If results is not null, show quiz Results
    if (playerResults !== null) {
      return (
        <PlayerQuizResults
          playerResults={playerResults}
          totalScore={totalPoints}
        />
      );
    }
    // When the timer runs out show a screen wide prompt on if the user was correct, incorrect all late to answer
    if (questionAnswerIds.length > 0 || timeLeft <= 0) {
      const isLast = question.isLast;
      let questionResultState = '';
      let questionResultAnswers = getQuestionAnswersText();

      if (playerAnswerIds.length === 0) {
        questionResultState = 'late';
      } else if (isPlayerCorrect()) {
        questionResultState = 'correct';
        questionResultAnswers = [];
      } else {
        questionResultState = 'incorrect';
      }
      return (
        <PlayQuestionResult
          state={questionResultState}
          isLast={isLast}
          answers={questionResultAnswers}
          getQuizResult={getQuizResult}
          playerResults={playerResults}
          totalPoints={totalPoints}
        />
      );
    }

    // responsive media query boolean
    const isThereMedia = question.imgSrc !== null || question.videoURL !== null;

    // Else return the deafult Question display
    return (
      <>
        <Grid xs={12} item>
          <Box pt={2} pb={2} mb={1} className={styles.questionHeader}>
            <div className={styles.questionNumber}>
              <WhiteTypography variant="h4">{question.id + 1}.</WhiteTypography>
            </div>
            <WhiteTypography variant="h3">{question.question}</WhiteTypography>
            <QuizTimer
              // Error occurs here because of parseInt?? TODO
              duration={parseInt(question.duration)}
              timeLeft={parseInt(timeLeft)}
            />
          </Box>
        </Grid>
        {question.type === 'multiple' && (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Box mb={2}>
              <Typography variant="h5">
                Select multiple answers and submit!
              </Typography>
            </Box>
          </Grid>
        )}

        <QuestionMediaBar
          imgSrc={question.imgSrc}
          videoURL={question.videoURL}
        />

        {/* If the player answered the question early determine */}

        <Container>
          {timeAnswered > 0 ? (
            <div
              className={
                isThereMedia ? styles.speedTextMedia : styles.speedText
              }>
              <Typography variant="h4">{speedText}</Typography>
            </div>
          ) : (
            <Grid
              container
              spacing={1}
              className={
                isThereMedia ? styles.questionGridMedia : styles.questionGrid
              }>
              {question.answers.map((ans) => {
                return (
                  <PlayQuestionButton
                    key={ans.id}
                    type={question.type}
                    answer={ans.answer}
                    id={ans.id}
                    handleQuestionClick={handleQuestionClick}
                  />
                );
              })}
              {question.type === 'multiple' && (
                <SubmitButton handleSubmitAnswers={handleSubmitAnswers} />
              )}
            </Grid>
          )}
        </Container>
      </>
    );
  };

  return (
    <Grid container className={styles.mainPlayGrid}>
      {renderPlayQuestion()}
    </Grid>
  );
};

export default PlayQuestion;
