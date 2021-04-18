import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/play.module.css';

import ReactPlayer from 'react-player';
import Image from 'material-ui-image';
import { Container, Grid } from '@material-ui/core';

/**
 *
 * @param {string} imgSrc       Image data string
 * @param {string} videoURL     Video URL (youtube url)
 * @returns
 */
export const QuestionMediaBar = ({ imgSrc, videoURL }) => {
  QuestionMediaBar.propTypes = {
    imgSrc: PropTypes.string,
    videoURL: PropTypes.string,
  };

  // If both image and url exist split them on a larger screen
  let isBoth = false;
  if (imgSrc !== null && videoURL !== null) {
    isBoth = true;
  }

  return (
    <Container>
      <Grid container className={styles.mediaGrid}>
        {imgSrc !== null && (
          <Grid item xs={12} md={isBoth ? 6 : 12} className={styles.mediaItem}>
            <div className={styles.quizImage}>
              <Image src={imgSrc} />
            </div>
          </Grid>
        )}
        {videoURL !== null && (
          <Grid item xs={12} md={isBoth ? 6 : 12} className={styles.mediaItem}>
            <div className={styles.quizVideo}>
              <ReactPlayer
                url={videoURL}
                width="100%"
                height="100%"
                controls={true}
              />
            </div>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default QuestionMediaBar;
