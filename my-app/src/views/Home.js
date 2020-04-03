import React from 'react';
import MediaTable from '../components/MediaTable';
import Typography from '@material-ui/core/Typography';

const Home = (props) => {
  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>Home</Typography>
      <MediaTable/>
    </>
  );
};

export default Home;
