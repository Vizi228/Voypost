import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Container from '@mui/material/Container';
import ImageListItem from '@mui/material/ImageListItem';
import { useAuth } from 'reactfire';
import { Link } from 'react-router-dom';
import { UIContext, useStyles } from '../../Unknown/UIContext';
import {
  SignUpValues,
  SignUpSchema,
} from '../../../utils/schemas/SignUpValidation';

const SignUpScreen: React.FC = () => {
  const { setAlert, setUserName } = useContext(UIContext);
  const auth = useAuth();
  const classes = useStyles();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleRepeatPassword, setIsVisibleRepeatPassword] =
    useState<boolean>(false);
  const registerForm = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: async ({ userName, email, password }: SignUpValues) => {
      try {
        await auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            userCredential.user?.updateProfile({
              displayName: userName,
            });
            setUserName(userName);
          });
      } catch (error) {
        setAlert({
          show: true,
          severity: 'error',
          message: `Error ${
            error instanceof Error ? error.message : 'Unknown Error'
          }`,
        });
      }
    },
  });
  const handleClickShowPassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  const handleClickShowRepeatPassword = () => {
    setIsVisibleRepeatPassword(!isVisibleRepeatPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <Container
        fixed
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100vh',
        }}
      >
        <ImageListItem>
          <img src="/login.png" alt="login" />
        </ImageListItem>
        <Box
          className={classes.root}
          sx={{
            padding: '25px 0',
          }}
        >
          <img src="logo.svg" alt="logo" />
          <Typography variant="h3" component="h2">
            Register
          </Typography>
          <Box className={classes.fieldWidth}>
            <form onSubmit={registerForm.handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                id="userName"
                variant="filled"
                name="userName"
                className={classes.field}
                type="text"
                value={registerForm.values.userName}
                onChange={registerForm.handleChange}
                error={
                  registerForm.touched.userName &&
                  Boolean(registerForm.errors.userName)
                }
              />
              <TextField
                id="email"
                name="email"
                variant="filled"
                type="email"
                fullWidth
                className={classes.field}
                label="Email"
                value={registerForm.values.email}
                onChange={registerForm.handleChange}
                error={
                  registerForm.touched.email &&
                  Boolean(registerForm.errors.email)
                }
              />
              <TextField
                label="Password"
                id="password"
                fullWidth
                type={isVisiblePassword ? 'text' : 'password'}
                name="password"
                variant="filled"
                className={classes.field}
                value={registerForm.values.password}
                onChange={registerForm.handleChange}
                error={
                  registerForm.touched.password &&
                  Boolean(registerForm.errors.password)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {isVisiblePassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Repeat Password"
                id="repeatPassword"
                fullWidth
                type={isVisibleRepeatPassword ? 'text' : 'password'}
                name="repeatPassword"
                variant="filled"
                className={classes.field}
                value={registerForm.values.repeatPassword}
                onChange={registerForm.handleChange}
                error={
                  registerForm.touched.repeatPassword &&
                  Boolean(registerForm.errors.repeatPassword)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowRepeatPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {isVisibleRepeatPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                disabled={registerForm.isSubmitting}
                color="secondary"
                fullWidth
                variant="contained"
                type="submit"
              >
                Register
              </Button>
            </form>
          </Box>
          <Box className={classes.signBox}>
            <Typography variant="text">Already have account?</Typography>
            <Link to="/login" className={classes.linkStyle}>
              <Button color="secondary">Login</Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUpScreen;
