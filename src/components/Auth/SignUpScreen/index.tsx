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
import LoginImg from '../assets/login.png';
import { ReactComponent as LogoImg } from '../assets/logo.svg';
import { UIContext, useStyles } from '../../Unknown/UIContext';
import {
  SignUpValues,
  SignUpSchema,
} from '../../../utils/schemas/SignUpValidation';
import SignPasswordComponent from '../SignPasswordComponent';

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
          const userCredentials = await auth.createUserWithEmailAndPassword(
            email,
            password,
          );
          await userCredentials.user?.updateProfile({
            displayName: userName,
          });
          setUserName(userName);
          setAlert({
            show: true,
            severity: 'info',
            message: 'Welcome on board 🚀',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
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
              <LogoImg />
              <Typography variant="h3" component="h2">
                Register
              </Typography>
              <Grid container className={classes.justifyCenter}>
                <Grid item md={9}>
                  <form onSubmit={handleSubmit}>
                    <Box mb={5}>
                      <TextField
                        fullWidth
                        label="Username"
                        id="userName"
                        variant="filled"
                        name="userName"
                        type="text"
                        value={values.userName}
                        onChange={handleChange}
                        error={touched.userName && Boolean(errors.userName)}
                      />
                    </Box>

                    <Box mb={5}>
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        variant="filled"
                        type="email"
                        fullWidth
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                      />
                    </Box>
                    <Box mb={5}>
                      <SignPasswordComponent
                        value={values.password}
                        touched={touched.password}
                        label="Password"
                        name="password"
                        errors={errors.password}
                        handleChange={handleChange}
                      />
                    </Box>
                    <Box mb={5}>
                      <SignPasswordComponent
                        value={values.repeatPassword}
                        touched={touched.repeatPassword}
                        label="Repeat Password"
                        name="repeatPassword"
                        errors={errors.repeatPassword}
                        handleChange={handleChange}
                      />
                    </Box>
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
                </Grid>
              </Grid>
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
