import React from 'react';
import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';

const MediaTable = () => {
  const picArray = useAllMedia();
  console.log(picArray);
  return (
    <table>
      <tbody>
        {
          picArray.map((file, index) => <MediaRow file={file} key={index}/>)
        }
      </tbody>
    </table>
  );
};

export default MediaTable;
