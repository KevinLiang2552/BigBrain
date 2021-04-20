import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper } from '@material-ui/core';

export const ResultsPercentCorrectGraph = ({ results, questionDetails }) => {
  ResultsPercentCorrectGraph.propTypes = {
    results: PropTypes.array,
    questionDetails: PropTypes.array,
  };

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    defineGraphData();
  }, [results]);

  const defineGraphData = () => {
    let questionCorrect;

    if (questionDetails.length > 0) {
      questionCorrect = [];
    } else {
      return;
    }

    for (const i in questionDetails) {
      questionCorrect.push({
        id: i,
        playersCorrect: 0,
      });
    }

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

      const newGraphData = [];
      for (const question of questionCorrect) {
        const percentCorrect =
          (question.playersCorrect / questionDetails.length) * 100;

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
      </Chart>
    </Paper>
  );
};
