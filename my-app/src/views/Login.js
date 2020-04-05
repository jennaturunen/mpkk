import React, {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: '2rem',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(true);
  // Funktio, jolla setToggle asetetaan true/false
  const showHide = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {toggle ?
          <LoginForm/> :
          <RegisterForm/>
      }
      <Button
        fullWidth
        color="primary"
        className={classes.margin}
        onClick={showHide}>{toggle ? 'or register' : 'or login'}</Button>
    </>
  );
};

export default Login;
