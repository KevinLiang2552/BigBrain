import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/dashboard.module.css';
import placeholderImage from '../../assets/placeholderImage.png';

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
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EditIcon from '@material-ui/icons/Edit';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

export const QuizCard = ({ quiz, deleteQuiz }) => {
  QuizCard.propTypes = {
    quiz: PropTypes.object,
    deleteQuiz: PropTypes.func,
  };

  return (
    <Grid item xs={12} md={4} className={styles.quizWrapper}>
      <Card className={styles.quizCard}>
        <div className={styles.quizz}></div>
        <CardMedia className={styles.quizImage} image={placeholderImage}>
          <IconButton
            className={styles.deleteButton}
            onClick={function () {
              deleteQuiz(quiz.id);
            }}>
            <DeleteIcon className={styles.deleteIcon} />
          </IconButton>
        </CardMedia>
        <CardContent>
          <Typography variant="h6">{quiz.name}</Typography>
          <div className={styles.detailWrapper}>
            <div className={styles.detail}>
              <AccessTimeIcon className={styles.detailIcon} />
              <Typography>10 mins</Typography>
            </div>
            <div className={styles.detail}>
              <QuestionAnswerIcon className={styles.detailIcon} />
              <Typography>{quiz.questions.length + ' questions'}</Typography>
            </div>
          </div>

          <div className={styles.controlsWrapper}>
            <Button className={`${styles.controls} ${styles.controlsPlay}`}>
              <PlayArrowIcon className={styles.controlIcon} />
              <Typography>Start</Typography>
            </Button>
            <Button className={`${styles.controls} ${styles.controlsStop}`}>
              <StopIcon className={styles.controlIcon} />
              <Typography>Stop</Typography>
            </Button>
            <Button className={`${styles.controls} ${styles.controlsEdit}`}>
              <EditIcon className={styles.controlIcon} />
              <Typography>Edit</Typography>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default QuizCard;
