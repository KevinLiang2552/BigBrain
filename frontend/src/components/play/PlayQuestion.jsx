import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../api/api.js';
import { getPlayerToken } from '../../helpers/user.js';
import styles from '../../styles/play.module.css';

import { Box, Container, Grid, Typography } from '@material-ui/core';
// import Image from 'material-ui-image';

import PlayQuestionButton from './PlayQuestionButton.jsx';
import PlayerQuizResults from './PlayerQuizResults.jsx';
import SubmitButton from './SubmitButton.jsx';
import QuizTimer from './QuizTimer.jsx';
import PlayQuestionResult from './PlayQuestionResult.jsx';

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
    getCurrentTimeLeft();
    startTimer();
  }, [questionData]);

  // When timehas run out end the question
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      getAnswer();
      pageForNewQuestion();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (questionAnswerIds.length > 0 && isPlayerCorrect()) {
      addPoints(currentPoints);
    }
  }, [questionAnswerIds]);

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

  // Get the answer of the current question (only occurs when the timer runs out)
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

  // Given an array of ids of players answer, put answer for the current question
  // Set time the player answered the question at. This is used to determine time points.
  const putAnswers = async () => {
    setFunnyText();
    setTimeAnswered(timeLeft);

    // set potential points for current question

    const questionPoints = parseInt(question.points) + calculateSpeedPoints();
    setCurrentPoints(questionPoints);

    const res = await api.authorisedRequest(
      'PUT',
      `play/${getPlayerToken()}/answer`,
      { answerIds: playerAnswerIds },
    );
    if (res.status !== 200) {
      console.log(res.data.error);
    }
  };

  /**
   * Given an id of answer. If single add this to answers and put these answer to api.
   * If multiple just add to array of answers.
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

  const handleSubmitAnswers = () => {
    putAnswers(playerAnswerIds);
  };

  /**
   *
   * @returns {bool} return if the player has the correct answer/s for the current question
   */
  const isPlayerCorrect = () => {
    let correct = true;
    console.log(playerAnswerIds);
    for (const questionAnswer of questionAnswerIds) {
      if (!playerAnswerIds.includes(questionAnswer)) {
        correct = false;
        break;
      }
    }

    return correct;
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

  const calculateSpeedPoints = () => {
    const howFast = Math.ceil((timeLeft / question.duration) * 10);
    return howFast * 0.1;
  };

  const getQuestionAnswersText = () => {
    const answersText = [];
    for (const questionAnswer of question.answers) {
      if (questionAnswerIds.includes(questionAnswer.id)) {
        answersText.push(questionAnswer.answer);
      }
    }
    return answersText;
  };

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
    if (playerResults !== null) {
      return <PlayerQuizResults playerResults={playerResults} />;
    }

    // If the answer has already been given (time out)
    // Display if the user was right or wrong or too late to answer
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

    // Else return the question and answers
    return (
      <>
        <Container>
          <Grid xs={12} item>
            <Box mt={3} mb={3} className={styles.questionDisplay}>
              <Typography></Typography>
              <Typography variant="h3">{question.question}</Typography>
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
        </Container>

        {/* Image and Video */}

        {/* <Grid item xs={12}>
          <Image src={question.imgSrc}></Image>
          <Image></Image>
        </Grid> */}

        {/* If the player answered the question early determine */}
        <Container>
          {timeAnswered > 0 ? (
            <div className={styles.speedText}>
              <Typography variant="h4">{speedText}</Typography>
            </div>
          ) : (
            <Grid container spacing={1} className={styles.questionGrid}>
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
    <>
      <Grid container>{renderPlayQuestion()}</Grid>
    </>
  );
};

export default PlayQuestion;
