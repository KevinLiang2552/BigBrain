import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import PlayQuestionButton from './PlayQuestionButton.jsx';
import QuizTimer from './QuizTimer.jsx';
import { getPlayerToken } from '../../helpers/user.js';
import API from '../../api/api.js';
import PlayQuestionResult from './PlayQuestionResult.jsx';

import styles from '../../styles/play.module.css';

/**
 *
 * @param {object} questionData The question's data (name, answers, etc...)
 * @returns
 */
export const PlayQuestion = ({ questionData, pageForNewQuestion }) => {
  PlayQuestion.propTypes = {
    questionData: PropTypes.object,
    pageForNewQuestion: PropTypes.func,
  };

  const api = new API('http://localhost:5005');

  // Question use state
  const [question, setQuestion] = useState(questionData);

  // Answers of the current quesiton
  const [questionAnswers, setQuestionAnswers] = useState([]);

  // Players answers of the current question
  const [playerAnswers, setPlayerAnswer] = useState([]);

  // The amount of time left for the question
  const [timeLeft, setTimeLeft] = useState(questionData.duration);

  // Timer interval (the interval that ticks every second)
  const [timer, setTimer] = useState(-1);

  // The amount of time left when the player answered
  const [timeAnswered, setTimeAnswered] = useState(-1);

  // Funny Text
  const [speedText, setSpeedText] = useState('');

  // Set default value when question data changes
  useEffect(() => {
    setQuestion(questionData);
    setTimeAnswered(-1);
    setQuestionAnswers([]);
    setPlayerAnswer([]);
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
      setQuestionAnswers(res.data.answerIds);
    } else {
      console.log(res.data.error);
    }
  };

  // Given an array of ids of players answer, put answer for the current question
  // Set time the player answered the question at. This is used to determine time points.
  const putAnswers = async () => {
    setFunnyText();
    setTimeAnswered(timeLeft);

    // TO DO: TIME POINTS

    const res = await api.authorisedRequest(
      'PUT',
      `play/${getPlayerToken()}/answer`,
      { answerIds: playerAnswers },
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
    playerAnswers.push(id);
    if (question.type === 'single') {
      putAnswers(playerAnswers);
    }
  };

  // TO DO HANDLE SUBMIT BUTTON FOR MULTIPLE ANSWER
  // const handleSubmitClick = () => {putAnswers(playerAnswers); }

  /**
   *
   * @returns {bool} return if the player has the correct answer/s for the current question
   */
  const isPlayerCorrect = () => {
    let correct = true;
    // console.log({ questionAnswers, playerAnswers });
    for (const questionAnswer of questionAnswers) {
      if (!playerAnswers.includes(questionAnswer)) {
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

  // Render the play question screen
  const renderPlayQuestion = () => {
    // If the answer has already been given (time out)
    // Display if the user was right or wrong or too late to answer
    if (questionAnswers.length > 0 || timeLeft <= 0) {
      // TO DO: ADD A NEW COMPONENT THAT SHOW IF THE PLAYER IS CORRECT OR NOT
      // Should display a buffer screen then the result

      if (playerAnswers.length === 0) {
        return <PlayQuestionResult state="late" />;
      } else if (isPlayerCorrect()) {
        return <PlayQuestionResult state="correct" />;
      } else {
        return <PlayQuestionResult state="incorrect" />;
      }
    }

    // Else return the question and answers
    return (
      <>
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

        {/* If the player answered the question early determine */}
        {timeAnswered > 0 ? (
          <div>
            <Typography>{speedText}</Typography>
          </div>
        ) : (
          <Grid container spacing={1} className={styles.questionGrid}>
            {question.answers.map((ans) => {
              return (
                <PlayQuestionButton
                  key={ans.id}
                  answer={ans.answer}
                  id={ans.id}
                  handleQuestionClick={handleQuestionClick}
                />
              );
            })}
          </Grid>
        )}
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
