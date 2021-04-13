import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Image from 'material-ui-image';
/**
 *
 * @param {object} question question object with all value e.g. id, question
 * @param {function} deleteQuestion Delete question function
 */

export const QuestionCard = ({ quizId, question, deleteQuestion }) => {
  QuestionCard.propTypes = {
    quizId: PropTypes.number,
    question: PropTypes.object,
    deleteQuestion: PropTypes.func,
  };

  let image;
  if (question.imgSrc !== null) {
    image = <Image src={question.imgSrc} />;
  }

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand">
          {question.id} : {question.question}
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <Grid>{image}</Grid>
            <Grid>
              Duration: {question.duration} <br /> Points: {question.points}
            </Grid>
            <Grid></Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QuestionCard;
