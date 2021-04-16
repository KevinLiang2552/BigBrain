import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import placeholderImage from '../../assets/placeholderImage.png';
import PropTypes from 'prop-types';
import Image from 'material-ui-image';
import ReactPlayer from 'react-player';

export const EditExternalMedia = ({ questionDetails, handleImageUpload }) => {
  EditExternalMedia.propTypes = {
    questionDetails: PropTypes.object,
    handleImageUpload: PropTypes.func,
  };

  return (
    <Grid item md={8} xs={12}>
      <Typography variant="h4">External Media</Typography>
      <Grid item md={4} xs={12}>
        <Typography variant="h5">Quiz Image</Typography>
        <Image
          src={
            questionDetails.imgSrc === null
              ? placeholderImage
              : questionDetails.imgSrc
          }
          alt={'question image'}
        />
        <Button variant="contained" component="label">
          Upload picture
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            id="questionImageUpload"
            hidden
          />
        </Button>
      </Grid>

      <Grid item md={4} xs={12}>
        <Typography variant="h5">Linked Quiz Video</Typography>
        {/* If you have an ad blocker, this will produce a bunch of errors in the console due to the ads being blocked by the client */}
        <ReactPlayer
          url={
            questionDetails.videoURL === null
              ? 'https://www.youtube.com/watch?v=UBSx4qqeikY'
              : questionDetails.videoURL
          }
        />
      </Grid>
    </Grid>
  );
};
