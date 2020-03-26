import React, {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const Profile = () => {
  const [user] = useContext(MediaContext);
  return (
    <>
      {user !== null &&
      <>
        <h1>Profile</h1>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.full_name}</p>
      </>
      }
    </>
  );
};

export default Profile;
