import React from 'react';
import Typography from '@material-ui/core/Typography';
import MyTable from '../components/MyTable';
import BackButton from '../components/BackButton';

const MyFiles = (props) => {
  return (
    <>
      <BackButton/>
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>My Files</Typography>
      <MyTable/>
    </>
  );
};

export default MyFiles;
