import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/play.module.css';

/**
 *
 * @param {string} answer The answeer text
 * @param {string} id     The id of the  answer
 * @param {string} handleQuestionClick handle for clicking of this answer
 * @returns
 */
export const PlayQuestionButton = ({ answer, id, handleQuestionClick }) => {
  PlayQuestionButton.propTypes = {
    answer: PropTypes.string,
    id: PropTypes.number,
    handleQuestionClick: PropTypes.func,
  };

  // Depending on the id change the colour of the button
  // TO DO: randomising of answer may be implemented take this into account
  const getBackgroundColour = () => {
    let backgroundColour;
    switch (id) {
      case 0: // Pinkish red
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
        // Dark red
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
