import React, {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon, Button,
} from '@material-ui/core';
import {getAvatarImage} from '../hooks/ApiHooks';
import ProfileForm from '../components/ProfileForm';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import {makeStyles} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';


const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: indigo[800],
  },
}));

const Profile = ({history}) => {
  const classes = useStyles();
  const [user] = useContext(MediaContext);
  const [avatar, setAvatar] = useState([]);

  useEffect(() => {
    (async () => {
      if (user !== null) {
        setAvatar(await getAvatarImage(user.user_id));
      }
    })();
  }, [user]);

  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>Profile</Typography>
      {user !== null && avatar.length > 0 &&
        <Card>
          <CardMedia
            component="img"
            image={mediaUrl + avatar[0].filename}
            alt="Avatar image"
            title="Avatar image"
          />
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="large" className={classes.icon}/>
                </ListItemIcon>
                <ListItemText primary={user.username}/>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon fontSize="large" className={classes.icon}/>
                </ListItemIcon>
                <ListItemText primary={user.email}/>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon fontSize="large" className={classes.icon}/>
                </ListItemIcon>
                <ListItemText primary={user.full_name}/>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      }
      <ProfileForm />
    </>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
};


export default Profile;
