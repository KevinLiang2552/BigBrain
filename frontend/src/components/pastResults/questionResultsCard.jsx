import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const QuestionResultsCard = ({ prevResults, quizQuestion }) => {
  QuestionResultsCard.propTypes = {
    prevResults: PropTypes.array,
    quizQuestion: PropTypes.array,
  };

  const checkResults = () => {
    console.log(prevResults);
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand">
          Question {quizQuestion.id + 1} results
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item>
              <Button onClick={checkResults}>wah</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
