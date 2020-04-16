import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import {Typography, Paper} from '@material-ui/core';
import BackButton from '../components/BackButton';
import Media from '../components/Media';

const Single = ({match}) => {
  // fetch single media based on id from path parameter
  const file = useSingleMedia(match.params.id);
  let description = undefined;
  if (file !== null) {
    description = JSON.parse(file.description);
  }

  return (
    <React.Fragment>
      {file !== null &&
          <>
            <BackButton/>
            <Typography
              component="h1"
              variant="h2"
              gutterBottom>{file.title}</Typography>
            <Typography
              component="h2"
              variant="h4"
              gutterBottom>{description.desc}</Typography>
            <Typography
              component="h2"
              variant="h4"
              gutterBottom>
              {file.user ? file.user.username : 'login to see userdata'}
            </Typography>
            <Paper>
              {description &&
              <Media file={file} description={description}/>
              }
            </Paper>
          </>
      }
    </React.Fragment>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};


export default Single;
