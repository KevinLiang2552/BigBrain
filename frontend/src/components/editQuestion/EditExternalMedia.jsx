import React from 'react';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import placeholderImage from '../../assets/placeholderImage.png';
import PropTypes from 'prop-types';
import Image from 'material-ui-image';
import ReactPlayer from 'react-player';
import EditIcon from '@material-ui/icons/Edit';

export const EditExternalMedia = ({
  questionDetails,
  handleImageUpload,
  handleUpdateDetail,
  toggleEnableEdit,
  enabledInput,
}) => {
  EditExternalMedia.propTypes = {
    questionDetails: PropTypes.object,
    handleImageUpload: PropTypes.func,
    handleUpdateDetail: PropTypes.func,
    toggleEnableEdit: PropTypes.func,
    enabledInput: PropTypes.bool,
  };

  return (
    <Grid container>
      <Typography variant="h4">External Media</Typography>
      {/* Header for the edit screen 
       Checks if editing or not to remove the edit icon */}
      {enabledInput === true ? (
        <></>
      ) : (
        <IconButton onClick={toggleEnableEdit}>
          <EditIcon />
        </IconButton>
      )}
      <Grid container spacing={4}>
        <Grid item md={3} xs={12}>
          {/* Display the image of the quiz 
          Checks if editing or not to add the upload button */}
          <Typography variant="h5">Quiz Image</Typography>
          <Image
            src={
              questionDetails.imgSrc === null
                ? placeholderImage
                : questionDetails.imgSrc
            }
            alt={'question image'}
          />
          {enabledInput === true ? (
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
          ) : (
            <></>
          )}
        </Grid>

        <Grid item md={8} xs={12}>
          {/* Display the video of the quiz 
          Checks if editing or not to add the upload button */}
          <Typography variant="h5">Linked Quiz Video</Typography>
          {/* If you have an ad blocker, this will produce a bunch of errors in the console due to the ads being blocked by the client */}
          {enabledInput === true ? (
            <TextField
              id="videoURL"
              label="Video URL"
              defaultValue={questionDetails.videoURL}
              variant="filled"
              onChange={handleUpdateDetail('videoURL')}
            />
          ) : (
            <>
              <ReactPlayer
                url={
                  questionDetails.videoURL === null
                    ? ''
                    : questionDetails.videoURL
                }
                width="100%"
              />
            </>
          )}
          <br />
        </Grid>
      </Grid>
    </Grid>
  );
};
