import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/play.module.css';

export const PlayQuestionButton = ({ answer, handleQuestionClick, id }) => {
  PlayQuestionButton.propTypes = {
    answer: PropTypes.string,
    handleQuestionClick: PropTypes.func,
    id: PropTypes.number,
  };

  const getBackgroundColour = () => {
    let backgroundColour;
    switch (id) {
      case 0: // Red
        backgroundColour = '#FF0075';
        break;
      case 1: // Blue
        backgroundColour = '#193DE6';
        break;
      case 2: // Green
        backgroundColour = '#44b800';
        break;
      case 3: // Yellow
        backgroundColour = '#E6C219';
        break;
      case 4: // Purple
        backgroundColour = '#7400b8';
        break;
      default:
        // Orange??
        backgroundColour = '#b80043';
        break;
    }
    return backgroundColour;
  };

  const QuestionButton = withStyles({
    root: {
      background: `linear-gradient(to right, ${getBackgroundColour()} 70%, ${getBackgroundColour()} )`,
      color: 'white',
      height: '100%',
      width: '100%',
      fontSize: '2em',
    },
  })(Button);

  return (
    <Grid xs={12} md={6} item>
      <QuestionButton
        variant="contained"
        className={styles.questionButton}
        onClick={function () {
          handleQuestionClick(id);
        }}>
        {answer}
      </QuestionButton>
    </Grid>
  );
};

export default PlayQuestionButton;
