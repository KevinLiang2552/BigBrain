import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper } from '@material-ui/core';

/**
 * @param {array} results The results of a given quiz session
 * @param {array} questionDetails The questions of a quiz and their details;
 */

export const ResultsAverageAnswerTimeGraph = ({ results, questionDetails }) => {
  ResultsAverageAnswerTimeGraph.propTypes = {
    results: PropTypes.array,
    questionDetails: PropTypes.array,
  };

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    defineGraphData();
  }, [results]);

  // Set the graph data with the given results
  const defineGraphData = () => {
    let questionAverageTime;

    if (questionDetails.length > 0) {
      questionAverageTime = [];
    } else {
      return;
    }

    // For all the questions, set each of them with an object
    // with an id and the total time every player took to answer
    for (const i in questionDetails) {
      questionAverageTime.push({
        id: i,
        totalAnswerTime: 0,
      });
    }

    // If the results has stuff in there
    // (aka the admin didn't decide to start a game without any players)
    // For each player, check the time it took them to answer
    // and add it to the question's total time
    if (results !== undefined) {
      for (const playerResult of results) {
        let questionCounter = 0;
        for (const question of playerResult.answers) {
          if (question.answeredAt !== undefined) {
            const startTime = new Date(question.questionStartedAt);
            const finishedTime = new Date(question.answeredAt);
            const timeLeft = (finishedTime - startTime) / 1000;
            questionAverageTime[questionCounter].totalAnswerTime += timeLeft;
          }
          questionCounter++;
        }
      }

      // Finds the average time for all players to answer.
      // Then turns the data into something that the graph API can read.
      const newGraphData = [];
      for (const question of questionAverageTime) {
        const averageTime = question.totalAnswerTime / results.length;

        newGraphData.push({
          argument: question.id,
          lineValue: averageTime,
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
        <BarSeries valueField="lineValue" argumentField="argument" />
        <Title text="Average time for users to answer a question" />
      </Chart>
    </Paper>
  );
};
