import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import useLoginForm from '../hooks/LoginHooks';
import {login} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {Button, Grid, TextField} from '@material-ui/core';

const LoginForm = (history) => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext);
  const doLogin = async () => {
    try {
      const userData = await login(inputs);
      setUser(userData.user);
      // Tallenna token
      localStorage.setItem('token', userData.token);
      // Siirry etusivulle
      history.push('/home');
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useLoginForm(doLogin);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>Login</h1>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid container item xs={12}>
              <TextField
                type="text"
                name="username"
                label="Username"
                onChange={handleInputChange}
                value={inputs.username}
                fullWidth
              />
            </Grid>
            <Grid container item xs={12}>
              <TextField
                type="password"
                name="password"
                label="Password"
                onChange={handleInputChange}
                value={inputs.password}
                fullWidth
              />
            </Grid>
            <Grid container item xs={12}>
              <Button fullWidth
                color="primary"
                type="submit"
                variant="contained">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
