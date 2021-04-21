import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper } from '@material-ui/core';

/**
 * @param {array} results The results of a given quiz session
 * @param {array} questionDetails The questions of a quiz and their details;
 */

export const ResultsPercentCorrectGraph = ({ results, questionDetails }) => {
  ResultsPercentCorrectGraph.propTypes = {
    results: PropTypes.array,
    questionDetails: PropTypes.array,
  };

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    defineGraphData();
  }, [results]);

  // Set the graph data with the given results
  const defineGraphData = () => {
    let questionCorrect;

    if (questionDetails.length > 0) {
      questionCorrect = [];
    } else {
      return;
    }

    // For all the questions, set each of them with an object
    // with an id and the number of players that got it correct
    for (const i in questionDetails) {
      questionCorrect.push({
        id: i,
        playersCorrect: 0,
      });
    }

    // If the results has stuff in there
    // (aka the admin didn't decide to start a game without any players)
    // For each player, check if they got the question correct and add to
    // the number of people who got it correct.
    if (results !== undefined) {
      for (const playerResult of results) {
        let questionCounter = 0;
        for (const question of playerResult.answers) {
          if (question.correct) {
            questionCorrect[questionCounter].playersCorrect++;
          }
          questionCounter++;
        }
      }

      // Finds the percent of players that got the question right.
      // Then turns the data into something that the graph API can read.
      const newGraphData = [];
      for (const question of questionCorrect) {
        const percentCorrect = (question.playersCorrect / results.length) * 100;

        newGraphData.push({
          argument: question.id,
          lineValue: percentCorrect,
        });
      }

      setGraphData(newGraphData);
    }
  };

  return (
    <Paper>
      <Chart data={graphData}>
        <ArgumentAxis />
        <ValueAxis />
        <LineSeries valueField="lineValue" argumentField="argument" />
        <Title text="Percentage of users answering each question correctly" />
      </Chart>
    </Paper>
  );
};
