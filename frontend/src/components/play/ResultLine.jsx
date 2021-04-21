import React from 'react';
import { ListItem, ListItemIcon, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from '../../styles/play.module.css';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

export const ResultLine = ({ question, index }) => {
  ResultLine.propTypes = {
    question: PropTypes.object,
    index: PropTypes.number,
  };

  const getText = () => {
    let text = 'Q' + (index + 1).toString() + '.       ';
    if (question.correct) {
      text += 'Correct';
    } else {
      text += 'Incorrect';
    }
    return text;
  };

  return (
    <ListItem className={styles.resultLine}>
      <div className={styles.resultLineTextWrapper}>
        <Typography variant="h5">{getText()}</Typography>
      </div>
      <ListItemIcon>
        {question.correct ? <CheckIcon /> : <CloseIcon />}
      </ListItemIcon>
    </ListItem>
  );
};

export default ResultLine;
