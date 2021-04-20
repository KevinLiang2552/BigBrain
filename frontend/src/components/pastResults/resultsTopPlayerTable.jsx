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
} from '@material-ui/core';
import { getQuestionPoints } from '../../helpers/generalHelpers.js';

export const ResultsTopPlayerTable = ({ results, questionDetails }) => {
  ResultsTopPlayerTable.propTypes = {
    results: PropTypes.object,
    questionDetails: PropTypes.array,
  };

  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    findTopPlayers();
  }, [results]);

  const findTopPlayers = () => {
    const playerScores = [];
    if (results.results.length > 0)
      for (const playerResult of results.results) {
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
    setTopPlayers(playerScores);
  };

  return (
    <>
      <Grid container>
        <Grid item>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
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
