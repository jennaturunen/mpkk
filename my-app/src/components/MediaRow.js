import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const MediaRow = ({file}) => {
  return (
    <tr>
      <td>
        <img src={mediaUrl + file.thumbnails.w160} alt={file.title}/>
      </td>
      <td>
        <h3>{file.title}</h3>
        <p>{file.description}</p>
      </td>
      <td>
        <Link to={'/single/' + file.file_id}>View</Link>
      </td>
    </tr>
  );
};


MediaRow.propTypes = {
  file: PropTypes.object,
};

export default MediaRow;
