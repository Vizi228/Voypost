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
import Grid from '@mui/material/Grid';
import { useAuth } from 'reactfire';
import { Link } from 'react-router-dom';
import LoginImg from '../../../assets/login.png';
import LogoImg from '../../../assets/logo.svg';
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

  const { values, handleChange, touched, handleSubmit, errors, isSubmitting } =
    useFormik({
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
      <Container fixed maxWidth="lg" className={classes.signContainer}>
        <Grid container>
          <Grid item md={7}>
            <ImageListItem className={classes.imageWidth}>
              <img src={LoginImg} alt="login" />
            </ImageListItem>
          </Grid>
          <Grid item md={5}>
            <Box className={classes.root}>
              <img src={LogoImg} alt="logo" />
              <Typography variant="h3">Login</Typography>
              <Grid container className={classes.justifyCenter}>
                <Grid item md={9}>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      variant="filled"
                      type="email"
                      className={classes.field}
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                    />
                    <TextField
                      label="Password"
                      id="password"
                      fullWidth
                      type={isVisiblePassword ? 'text' : 'password'}
                      name="password"
                      variant="filled"
                      className={classes.field}
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {isVisiblePassword ? (
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
                      disabled={isSubmitting}
                      color="secondary"
                      fullWidth
                      variant="contained"
                      type="submit"
                    >
                      Login
                    </Button>
                  </form>
                </Grid>
              </Grid>
              <Box className={classes.signBox}>
                <Typography variant="h6">Don’t have an account?</Typography>
                <Link
                  to="/register"
                  color="secondary"
                  className={classes.linkStyle}
                >
                  Register
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignInScreen;
