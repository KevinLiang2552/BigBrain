import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from '@material-ui/core';
import placeholderImage from '../../assets/placeholderImage.png';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Image from 'material-ui-image';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
/**
 *
 * @param {object} question question object with all value e.g. id, question
 * @param {function} deleteQuestion Delete question function
 */

export const QuestionCard = ({ question, deleteQuestion }) => {
  QuestionCard.propTypes = {
    question: PropTypes.object,
    deleteQuestion: PropTypes.func,
  };

  // Display the image if it exists, if not currently displays a placeholder
  let image;
  if (question.imgSrc !== null) {
    image = <Image src={question.imgSrc} />;
  } else {
    image = <Image src={placeholderImage} />;
  }

  // Provide a link to the video if it exists, else say that there is no link.
  let videoURL;
  if (question.videoURL !== null) {
    videoURL = (
      <>
        <span>
          Video URL:{' '}
          <Link href={question.videoURL} color="black">
            {question.videoURL}
          </Link>
        </span>
      </>
    );
  } else {
    videoURL = <span>Video URL: No video added</span>;
  }

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand">
          {question.id} : {question.question}
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {/* Image found in the question */}
            <Grid item md={3} xs={12}>
              {image}
            </Grid>
            {/* Details found in the question */}
            <Grid item md={5} xs={12}>
              <Typography variant="h4">Details:</Typography>
              <List>
                <ListItem key={0}>
                  <ListItemText primary={`Duration: ${question.duration}`} />
                </ListItem>
                <ListItem key={2}>
                  <ListItemText primary={`Points: ${question.points}`} />
                </ListItem>
                <ListItem key={3}>{videoURL}</ListItem>
              </List>
            </Grid>
            {/* Answers found in the question & the correct answer/s */}
            <Grid item md={3} xs={12}>
              <Typography variant="h4">Answers:</Typography>
              <List>
                {question.answers.map((answer) => {
                  let icon;
                  if (question.correctAnswers.includes(answer.id)) {
                    icon = <CheckIcon />;
                  } else {
                    icon = <ClearIcon />;
                  }
                  return (
                    <>
                      <ListItem key={answer.id}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText
                          id={answer.id}
                          primary={`${answer.answer}`}
                        />
                      </ListItem>
                    </>
                  );
                })}
              </List>
            </Grid>
            <Grid item md={1} xs={12}>
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton onClick={deleteQuestion(question.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QuestionCard;
