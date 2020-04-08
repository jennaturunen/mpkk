import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {checkToken} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PublishIcon from '@material-ui/icons/Publish';
import indigo from '@material-ui/core/colors/indigo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerIcons: {
    paddingRight: '3rem',
    paddingLeft: '3rem',
    paddingBottom: '1rem',
  },
  indigo: {
    backgroundColor: indigo[800],
  },
  bolder: {
    fontWeight: 900,
  },
}));

const Nav = ({history}) => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (opener) => () => {
    setOpen(opener);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await checkToken(localStorage.getItem('token'));
        console.log(userData);
        setUser(userData);
      } catch (e) {
        // Send to login-page
        history.push('/home');
      }
    };

    checkUser();
  }, [history, setUser]);

  return (
    <>
      <AppBar className={classes.indigo}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon fontSize="large"/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
              MyApp
          </Typography>
          {user === null ?
                <Button
                  color="inherit"
                  startIcon={<ExitToAppIcon/>}
                  component={RouterLink}
                  to="/"
                >
                  Login
                </Button> :
                <Button
                  color="inherit"
                  startIcon={<ExitToAppIcon/>}
                  component={RouterLink}
                  to="/logout"
                >
                  Logout
                </Button>
          }
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItem
            button
            component={RouterLink}
            onClick={toggleDrawer(false)}
            to="/home"
            className={classes.drawerIcons}
          >
            <ListItemIcon>
              <HomeIcon
                fontSize="large"
                style={{color: indigo[800]}}/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
          {user !== null &&
              <>
                <ListItem
                  button
                  component={RouterLink}
                  onClick={toggleDrawer(false)}
                  to="/profile"
                  className={classes.drawerIcons}
                >
                  <ListItemIcon>
                    <AccountCircleIcon
                      fontSize="large"
                      style={{color: indigo[800]}}/>
                  </ListItemIcon>
                  <ListItemText primary="Profile"/>
                </ListItem>
                <ListItem
                  button
                  component={RouterLink}
                  onClick={toggleDrawer(false)}
                  to="/upload"
                  className={classes.drawerIcons}
                >
                  <ListItemIcon>
                    <PublishIcon
                      fontSize="large"
                      style={{color: indigo[800]}}/>
                  </ListItemIcon>
                  <ListItemText primary="Upload"/>
                </ListItem>
              </>
          }
        </List>
      </Drawer>
    </>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Nav);
