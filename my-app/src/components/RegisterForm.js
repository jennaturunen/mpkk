/* eslint-disable max-len */
import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import {checkUserAvailable, login, register} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {Button, Grid} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      console.log(value);
      if (value !== inputs.password) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      console.log(value);
      try {
        const response = await checkUserAvailable(value);
        console.log(response);
        return response.available;
      } catch (e) {
        console.log(e.message);
        return true;
      }
    });
  }, [inputs]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Register</h1>
        </Grid>
        <Grid item xs={12}>
          <ValidatorForm
            onSubmit={handleSubmit}
            instantValidate={false}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid container item xs={12}>
                <TextValidator
                  type="text"
                  fullWidth
                  name="username"
                  label="Username"
                  onChange={handleInputChange}
                  value={inputs.username}
                  validators={[
                    'required',
                    'minStringLength:3',
                    'isAvailable',
                  ]}
                  errorMessages={[
                    'this field is required',
                    'minimum 3 charaters',
                    inputs.username + ' is not available',
                  ]}

                />
              </Grid>
              <Grid container item xs={12}>
                <TextValidator
                  type="password"
                  name="password"
                  label="Password"
                  onChange={handleInputChange}
                  value={inputs.password}
                  validators={['minStringLength:5', 'required']}
                  errorMessages={[
                    'minimum length 5 characters',
                    'this field is required']}

                  fullWidth
                />
              </Grid>
              <Grid container item xs={12}>
                <TextValidator
                  type="password"
                  name="confirm"
                  label="Confirm password"
                  onChange={handleInputChange}
                  value={inputs.confirm}
                  validators={['isPasswordMatch', 'required']}
                  errorMessages={['password mismatch', 'this field is required']}
                  fullWidth
                />
              </Grid>
              <Grid container item xs={12}>
                <TextValidator
                  type="email"
                  name="email"
                  label="Email"
                  onChange={handleInputChange}
                  value={inputs.email}
                  fullWidth
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                />
              </Grid>
              <Grid container item xs={12}>
                <TextValidator
                  type="text"
                  name="full_name"
                  label="Full name"
                  onChange={handleInputChange}
                  value={inputs.full_name}
                  validators={
                    ['matchRegexp:^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$']
                  }
                  errorMessages={['text only']}
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
          </ValidatorForm>
        </Grid>
      </Grid>
    </>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(RegisterForm);
