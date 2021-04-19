import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const WhiteTypography = withStyles({
  root: {
    color: '#FFFFFF',
  },
})(Typography);

export const WhiteShadowTypography = withStyles({
  root: {
    color: '#FFFFFF',
    textShadow:
      '1px 1px 3px  #000000, 1px 1px 3px  #000000, 1px 1px 3px  #000000, 1px 1px 3px  #000000',
  },
})(Typography);

export default WhiteTypography;
