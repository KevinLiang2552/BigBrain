import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { getQuestionPoints } from '../../helpers/generalHelpers.js';

/**
 * @param {array} results The results of a given quiz session
 * @param {array} questionDetails The questions of a quiz and their details;
 */

export const ResultsTopPlayerTable = ({ results, questionDetails }) => {
  ResultsTopPlayerTable.propTypes = {
    results: PropTypes.array,
    questionDetails: PropTypes.array,
  };

  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    findTopPlayers();
  }, [results]);

  // Calculates and finds the top 5 players of the session
  const findTopPlayers = () => {
    const playerScores = [];

    // Need to check if there were any results for that quiz or not.
    if (results !== undefined)
      for (const playerResult of results) {
        let questionCounter = 0;
        let playerScore = 0;

        for (const question of playerResult.answers) {
          if (question.correct) {
            const startTime = new Date(question.questionStartedAt);
            const finishedTime = new Date(question.answeredAt);
            const timeLeft = (finishedTime - startTime) / 1000;

            playerScore += getQuestionPoints(
              questionDetails[questionCounter].points,
              timeLeft,
              parseInt(questionDetails[questionCounter].duration),
            );
          }
        }
        playerScores.push({ name: playerResult.name, score: playerScore });
        questionCounter++;
      }
    playerScores.sort((a, b) => {
      return b.score - a.score;
    });
    if (playerScores.length > 5) {
      const topFivePlayers = playerScores.splice(0, 5);
      setTopPlayers(topFivePlayers);
    } else {
      for (let i = 0; playerScores.length < 5; i++) {
        playerScores.push({ name: '-', score: '-' });
      }
      setTopPlayers(playerScores);
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center">
        <Grid item>
          <Typography variant="h5">Top 5 Players</Typography>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="top 5 table">
              <TableHead>
                <TableRow>
                  <TableCell>Player</TableCell>
                  <TableCell align="right">Total Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topPlayers.map((player, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {player.name}
                      </TableCell>
                      <TableCell align="right">{player.score}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
