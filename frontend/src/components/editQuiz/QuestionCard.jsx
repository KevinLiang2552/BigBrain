import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/dashboard.module.css';
import placeholderImage from '../../assets/placeholderImage.png';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EditIcon from '@material-ui/icons/Edit';

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

  const history = useHistory();

  const handleEdit = () => {
    history.push(`/dashboard/edit/${quizId}/${question.id}`);
  };

  // const image
  const questionCardImage =
    question.thumbnail === null ? placeholderImage : question.thumbnail;

  return (
    <Grid item xs={12} md={4} className={styles.quizWrapper}>
      <Card className={styles.quizCard}>
        <div className={styles.quizz}></div>
        <CardMedia className={styles.quizImage} image={questionCardImage}>
          <div className={styles.deleteWrapper}>
            <IconButton
              className={styles.deleteButton}
              onClick={function () {
                deleteQuestion(question.id);
              }}>
              <DeleteIcon className={styles.deleteIcon} />
            </IconButton>
          </div>
        </CardMedia>
        <CardContent>
          <Typography variant="h6">{question.name}</Typography>
          <div className={styles.detailWrapper}>
            <div className={styles.detail}>
              <AccessTimeIcon className={styles.detailIcon} />
              <Typography>10 mins</Typography>
            </div>
          </div>

          <div className={styles.controlsWrapper}>
            <Button
              className={`${styles.controls} ${styles.controlsEdit}`}
              startIcon={<EditIcon />}
              onClick={handleEdit}>
              <Typography>Edit</Typography>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default QuestionCard;
