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
  SignInSchema,
  SignInValues,
} from '../../../utils/schemas/SignInValidation';

const SignInScreen: React.FC = () => {
  const { setAlert, setUserName } = useContext(UIContext);
  const auth = useAuth();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const classes = useStyles();

  const signIn = async ({ email, password }: SignInValues) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      if (user) setUserName(user?.displayName);
    } catch (error) {
      setAlert({
        show: true,
        severity: 'error',
        message: `Error ${
          error instanceof Error ? error.message : 'Unknown Error'
        }`,
      });
    }
  };

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: async ({ email, password }: SignInValues) => {
      signIn({ email, password });
    },
  });
  const handleClickShowPassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
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
          <Typography variant="h3">Login</Typography>
          <Box sx={{ width: 375 }}>
            <form onSubmit={loginForm.handleSubmit}>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="filled"
                type="email"
                className={classes.field}
                fullWidth
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
                error={
                  loginForm.touched.email && Boolean(loginForm.errors.email)
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
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                error={
                  loginForm.touched.password &&
                  Boolean(loginForm.errors.password)
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
              <Button
                disabled={loginForm.isSubmitting}
                color="secondary"
                fullWidth
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </form>
          </Box>
          <Box className={classes.signBox}>
            <Typography variant="text">Don’t have an account?</Typography>
            <Link to="/register" className={classes.linkStyle}>
              <Button color="secondary">Register</Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignInScreen;
