import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import {Typography, Paper, makeStyles} from '@material-ui/core';
import BackButton from '../components/BackButton';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    borderRadius: 4,
    marginBottom: -3,
  },
}));

const Single = ({match, history}) => {
  const classes = useStyles();
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
            <Paper>
              {description &&
              <img
                src={mediaUrl + file.filename}
                alt={file.title}
                className={classes.image}
                style={
                  {
                    filter: `brightness(${description.filters.brightness}%)
                      contrast(${description.filters.contrast}%)
                      saturate(${description.filters.saturation}%)
                      sepia(${description.filters.sepia}%)`,
                  }
                }
              />
              }
            </Paper>
          </>
      }
    </React.Fragment>
  );
};

Single.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};


export default Single;
