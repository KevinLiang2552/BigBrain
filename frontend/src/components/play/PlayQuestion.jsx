import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import PlayQuestionButton from './PlayQuestionButton.jsx';
import QuizTimer from './QuizTimer.jsx';
import { getPlayerToken } from '../../helpers/user.js';
import API from '../../api/api.js';

import styles from '../../styles/play.module.css';

/**
 *
 * @param {object} questionData The question's data (name, answers, etc...)
 * @returns
 */
export const PlayQuestion = ({ questionData }) => {
  PlayQuestion.propTypes = {
    questionData: PropTypes.object,
  };
  const api = new API('http://localhost:5005');

  // Question use state
  const [question, setQuestion] = useState(questionData);
  const [timeAnswered, setTimeAnswered] = useState(-1);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [playerAnswers, setPlayerAnswer] = useState([]);

  // Timer
  const [timeLeft, setTimeLeft] = useState(questionData.duration);
  const [timer, setTimer] = useState(-1);

  // Actively update question use state when question data changes
  useEffect(() => {
    setQuestion(questionData);
    setTimeAnswered(-1);
    setQuestionAnswers([]);
    setPlayerAnswer([]);

    console.log(playerAnswers);
    getCurrentTimeLeft();
    startTimer();
  }, [questionData]);

  const answers = [];

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

  const handleQuestionClick = (id) => {
    answers.push(id);
    if (question.type === 'single') {
      putAnswers(answers);
      setTimeAnswered(timeLeft);
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
    return () => {
      if (timeLeft > 0) {
        clearInterval(timer);
      }
    };
  };

  // When timeLeft is 0 or less end the question
  useEffect(() => {
    if (timeLeft <= 0) {
      console.log({ timer });
      clearInterval(timer);
      getAnswer();
    }
  }, [timeLeft]);

  const getAnswer = async () => {
    const res = await api.authorisedRequest(
      'GET',
      `play/${getPlayerToken()}/answer`,
    );
    if (res.status === 200) {
      console.log({ quiz: res.data });
      setQuestionAnswers(res.data.answerIds);
    } else {
      console.log(res.data.error);
    }
  };

  const putAnswers = async (ids) => {
    const res = await api.authorisedRequest(
      'PUT',
      `play/${getPlayerToken()}/answer`,
      { answerIds: ids },
    );
    if (res.status === 200) {
      setPlayerAnswer(ids);
    } else {
      console.log(res.data.error);
    }
  };

  // Render the play question screen
  const renderPlayQuestion = () => {
    // If the answer has already been given (time out)
    // Display if the user was right or wrong or too late to answer
    if (questionAnswers.length > 0) {
      return <div>{`${questionAnswers[0]} ${playerAnswers[0]}`}</div>;
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

        {/* If the player answered the question early determine something */}
        {timeAnswered > 0 ? (
          <div>
            <Typography>Speed demon</Typography>
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
