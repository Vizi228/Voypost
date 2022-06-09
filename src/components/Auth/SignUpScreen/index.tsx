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
  const { values, handleChange, touched, handleSubmit, errors, isSubmitting } =
    useFormik({
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
              <Typography variant="h3" component="h2">
                Register
              </Typography>
              <Box className={classes.fieldWidth}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Username"
                    id="userName"
                    variant="filled"
                    name="userName"
                    className={classes.field}
                    type="text"
                    value={values.userName}
                    onChange={handleChange}
                    error={touched.userName && Boolean(errors.userName)}
                  />
                  <TextField
                    id="email"
                    name="email"
                    variant="filled"
                    type="email"
                    fullWidth
                    className={classes.field}
                    label="Email"
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
                  <TextField
                    label="Repeat Password"
                    id="repeatPassword"
                    fullWidth
                    type={isVisibleRepeatPassword ? 'text' : 'password'}
                    name="repeatPassword"
                    variant="filled"
                    className={classes.field}
                    value={values.repeatPassword}
                    onChange={handleChange}
                    error={
                      touched.repeatPassword && Boolean(errors.repeatPassword)
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
                    disabled={isSubmitting}
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
                <Typography variant="h6">Already have account?</Typography>
                <Link to="/login" className={classes.linkStyle}>
                  Login
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignUpScreen;
