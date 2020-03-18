import React from 'react';
import PropTypes from 'prop-types';

const CatRow = ({file}) => {
  return (
    <tr>
      <td>
        <img src={file.thumbnails.w160} alt="Title"/>
      </td>
      <td>
        <h3>{file.title}</h3>
        <p>{file.description}</p>
      </td>
      <td>
        <a href={file.filename}>View</a>
      </td>
    </tr>
  );
};


CatRow.propTypes = {
  file: PropTypes.object,
};

export default CatRow;
