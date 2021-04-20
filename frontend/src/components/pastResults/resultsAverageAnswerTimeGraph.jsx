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

export const ResultsAverageAnswerTimeGraph = ({ results, questionDetails }) => {
  ResultsAverageAnswerTimeGraph.propTypes = {
    results: PropTypes.array,
    questionDetails: PropTypes.array,
  };

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    defineGraphData();
  }, [results]);

  const defineGraphData = () => {
    let questionAverageTime;

    if (questionDetails.length > 0) {
      questionAverageTime = [];
    } else {
      return;
    }

    for (const i in questionDetails) {
      questionAverageTime.push({
        id: i,
        totalAnswerTime: 0,
      });
    }

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
