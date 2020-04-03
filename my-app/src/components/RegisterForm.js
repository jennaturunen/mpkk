import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import {checkUserAvailable, login, register} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {Button, Grid, TextField} from '@material-ui/core';

const RegisterForm = ({history}) => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext);
  const doRegister = async () => {
    try {
      await checkUserAvailable(inputs.username);
      await register(inputs);
      // Kirjaudu automaattisesti sisään
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

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Register</h1>
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
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  onChange={handleInputChange}
                  value={inputs.email}
                  fullWidth
                />
              </Grid>
              <Grid container item xs={12}>
                <TextField
                  type="text"
                  name="full_name"
                  label="Full name"
                  onChange={handleInputChange}
                  value={inputs.full_name}
                  fullWidth
                />
              </Grid>
              <Grid container item xs={12}>
                <Button fullWidth
                  color="primary"
                  type="submit"
                  variant="contained">
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(RegisterForm);
