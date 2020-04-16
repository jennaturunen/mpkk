import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {
  GridListTileBar,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {deleteFile} from '../hooks/ApiHooks';


const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


const MediaRow = ({file, myfiles}) => {
  const description = JSON.parse(file.description);
  const classes = useStyles();
  let thumb = 'https://via.placeholder.com/320x200.png?text=Audio';
  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails.w320;
  }

  return (
    <>
      <img
        src={thumb}
        alt={file.title}
        style={
          {
            filter: `brightness(${description.filters.brightness}%)
                      contrast(${description.filters.contrast}%)
                      saturate(${description.filters.saturation}%)
                      sepia(${description.filters.sepia}%)`,
            width: '100%',
          }
        }
      />
      <GridListTileBar
        title={file.title}
        subtitle={myfiles ? '' : description.desc}
        actionIcon={
          <>
            <IconButton
              aria-label={`info about ${file.title}`}
              component={RouterLink}
              to={'/single/' + file.file_id}
              className={classes.icon}
            >
              <ImageSearchIcon fontSize="large"/>
            </IconButton>
            {myfiles &&
              <>
                <IconButton
                  aria-label={`Modify file`}
                  component={RouterLink}
                  to={'/modify/' + file.file_id}
                  className={classes.icon}
                >
                  <CreateIcon fontSize="large" />
                </IconButton>
                <IconButton
                  aria-label={`Delete file`}
                  className={classes.icon}
                  onClick={() => {
                    // eslint-disable-next-line max-len
                    const delOK = window.confirm('Do you really want to delete the file?');
                    if (delOK) {
                      deleteFile(file.file_id);
                    }
                  }}
                >
                  <DeleteForeverIcon fontSize="large" />
                </IconButton>
              </>
            }
          </>
        }
      />
    </>);
};


MediaRow.propTypes = {
  file: PropTypes.object,
  myfiles: PropTypes.bool,
};

export default MediaRow;
