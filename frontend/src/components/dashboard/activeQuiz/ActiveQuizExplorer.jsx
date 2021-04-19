import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/components/activeQuiz.module.css';
import API from '../../../api/api.js';

import ActiveQuizItem from './ActiveQuizItem.jsx';
import ActiveQuizControls from './ActiveQuizControls.jsx';
import {
  emptyQuizIdDetails,
  emptySessionStatus,
} from '../../../helpers/emptyTypes.js';

import { Grid } from '@material-ui/core';
// import { QuizModal } from '../QuizModal';

export const ActiveQuizExplorer = ({ quizzes }) => {
  const api = new API('http://localhost:5005');

  ActiveQuizExplorer.propTypes = {
    quizzes: PropTypes.array,
  };

  // Store the current quiz ids in the explorer
  const [activeQuizIds, setActiveQuizIds] = useState([]);

  // Session status HashMap of each active quiz. Where the key is the id of the map
  const [sessionStatus] = useState(new Map());

  // The current selected quiz for the details to show
  const [selectedQuizId, setSelectedQuizId] = useState(-1);

  // Update activeQuizzes when quizzes changes
  useEffect(() => {
    setSelectedQuizId(-1);
    console.log({ quizzes });
    // Make an array of the presntly active quiz ids
    const presentlyActiveQuizIds = [];
    for (const quiz of quizzes) {
      presentlyActiveQuizIds.push(quiz.id);
    }
    console.log({ presentlyActiveQuizIds, activeQuizIds });
    // Delete quiz ids session statuses that are not active anymore
    const stoppedQuizIds = activeQuizIds.filter(
      (id) => presentlyActiveQuizIds.indexOf(id) === -1,
    );
    for (const quizId of stoppedQuizIds) {
      sessionStatus.delete(quizId);
    }
    console.log({ stoppedQuizIds });
    // Set quiz ids session statuses that have just become active
    const newQuizIds = presentlyActiveQuizIds.filter(
      (id) => activeQuizIds.indexOf(id) === -1,
    );
    for (const quizId of newQuizIds) {
      fetchSessionStatus(getQuizDetails(quizId));
    }
    console.log({ newQuizIds });

    // Then set active quiz ids
    setActiveQuizIds(presentlyActiveQuizIds);
  }, [quizzes]);

  // get session status of given quiz
  const fetchSessionStatus = async (quiz) => {
    const result = await api.authorisedRequest(
      'GET',
      `admin/session/${quiz.active}/status`,
    );
    console.log({ quiz, result });
    if (result.status === 200) {
      sessionStatus.set(quiz.id, result.data.results);
      console.log('HELLO');
      console.log({ sessionStatus });
    } else {
      console.log(result.data.error);
    }
  };

  // Given an id get the quiz with that id
  const getQuizDetails = (id) => {
    if (id === -1) {
      return emptyQuizIdDetails;
    }
    return quizzes.find((q) => q.id === id);
  };

  const getSessionStatus = (id) => {
    if (id === -1) {
      return emptySessionStatus;
    }

    if (sessionStatus.has(id)) {
      return sessionStatus.get(id);
    } else {
      return emptySessionStatus;
    }
  };

  const selectQuiz = (id) => {
    setSelectedQuizId(id);
  };

  return (
    <Grid container className={styles.explorerWrapper}>
      <Grid item xs={5}>
        <Grid container>
          {quizzes.length > 0 &&
            quizzes.map((quiz) => {
              return (
                <ActiveQuizItem
                  key={quiz.id}
                  quiz={quiz}
                  status={getSessionStatus(quiz.id)}
                  selectQuiz={selectQuiz}
                />
              );
            })}
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <ActiveQuizControls
          quiz={getQuizDetails(selectedQuizId)}
          status={getSessionStatus(selectedQuizId)}
        />
      </Grid>
    </Grid>
  );
};

export default ActiveQuizExplorer;
