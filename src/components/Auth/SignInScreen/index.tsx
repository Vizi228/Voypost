import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from 'reactfire';
import { UIContext } from '../../Unknown/UIContext';

interface Values {
  email: string;
  password: string;
}

const SignInScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const auth = useAuth();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }: Values) => {
      if (email && password) {
        try {
          setDisabled(true);
          await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
          setAlert({
            show: true,
            severity: 'error',
            message: `Error ${error}`,
          });
        } finally {
          setDisabled(false);
        }
      } else {
        loginForm.errors.email = 'Error';
        loginForm.errors.password = 'Error';
      }
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
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Container fixed maxWidth="xl">
          <Grid container>
            <Grid item xs={6}>
              <ImageListItem sx={{ height: '100% !important' }}>
                <img src="/login.png" alt="login" />
              </ImageListItem>
            </Grid>
            <Grid item xs={6} sx={{ padding: '100px 0' }}>
              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <svg
                  width="173"
                  height="37"
                  viewBox="0 0 173 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M69.305 29.7156H72.4109L78.7725 14.1055H74.6562L70.8767 24.7881L67.1346 14.1055H62.9435L69.305 29.7156ZM87.4167 30.0541C88.4839 30.0653 89.5422 29.8579 90.527 29.4445C91.5119 29.0311 92.4026 28.4203 93.1449 27.6495C93.8873 26.8787 94.4656 25.964 94.8447 24.9611C95.2238 23.9583 95.3956 22.8883 95.3498 21.8165C95.3498 17.4156 92.2065 13.7294 87.4167 13.7294C86.3565 13.7031 85.3021 13.8949 84.3183 14.293C83.3345 14.6912 82.442 15.2871 81.6956 16.0445C80.9492 16.8018 80.3647 17.7044 79.9778 18.697C79.591 19.6895 79.41 20.7511 79.446 21.8165C79.3948 22.8946 79.5639 23.9718 79.9429 24.9817C80.3219 25.9916 80.9028 26.9126 81.6497 27.6881C82.3965 28.4635 83.2936 29.0769 84.2855 29.4903C85.2774 29.9037 86.343 30.1084 87.4167 30.0917V30.0541ZM87.4167 26.744C84.5353 26.744 83.3752 24.4495 83.3752 21.8541C83.3752 19.2963 84.5353 17.0771 87.4167 17.0771C90.2606 17.0771 91.4207 19.3339 91.4207 21.8541C91.4207 24.4495 90.298 26.744 87.4167 26.744ZM104.106 34.8688L112.339 14.1055H108.185L104.181 24.9385L100.289 14.1055H96.0983L102.16 29.3018L99.9152 34.8688H104.031H104.106ZM118.401 34.8688V28.1734C119.524 29.4899 121.208 30.0541 122.854 30.0541C127.12 30.0541 129.515 26.2174 129.515 21.8917C129.515 17.5661 127.12 13.767 122.779 13.767C121.095 13.767 119.486 14.3312 118.401 15.6477V14.1055H114.547V34.8688H118.401ZM121.844 26.5183C119.224 26.5183 118.064 24.5248 118.064 21.8917C118.064 19.2587 119.224 17.1899 121.806 17.1899C124.426 17.1899 125.623 19.2587 125.623 21.8917C125.623 24.5248 124.463 26.5183 121.844 26.5183ZM139.244 30.0541C140.315 30.0705 141.377 29.8669 142.366 29.4558C143.356 29.0446 144.251 28.4347 144.997 27.6633C145.744 26.892 146.325 25.9755 146.707 24.9701C147.088 23.9647 147.261 22.8915 147.215 21.8165C147.215 17.4156 144.034 13.7294 139.244 13.7294C138.184 13.7031 137.13 13.8949 136.146 14.293C135.162 14.6912 134.27 15.2871 133.523 16.0445C132.777 16.8018 132.192 17.7044 131.806 18.697C131.419 19.6895 131.238 20.7511 131.274 21.8165C131.222 22.8946 131.392 23.9718 131.771 24.9817C132.15 25.9916 132.73 26.9126 133.477 27.6881C134.224 28.4635 135.121 29.0769 136.113 29.4903C137.105 29.9037 138.171 30.1084 139.244 30.0917V30.0541ZM139.244 26.744C136.363 26.744 135.24 24.4495 135.24 21.8541C135.24 19.2963 136.363 17.0771 139.244 17.0771C142.126 17.0771 143.248 19.3339 143.248 21.8541C143.248 24.4495 142.126 26.744 139.244 26.744ZM154.961 30.0541C157.955 30.0541 161.061 28.4367 161.061 24.7881C161.061 19.0706 153.165 20.5 153.165 18.1303C153.165 17.378 153.913 16.7761 155.148 16.7761C156.832 16.7761 157.693 17.7917 158.254 18.7697L161.173 17.1523C160.013 15.0459 157.955 13.767 155.26 13.767C152.267 13.767 149.498 15.3468 149.498 18.6569C149.498 24.1486 157.319 22.3807 157.319 25.0138C157.319 25.8413 156.57 26.8945 154.811 26.8945C152.716 26.8945 151.893 25.4275 151.481 24.2991L148.487 25.6532C149.236 28.0605 151.705 30.0541 154.998 30.0541H154.961ZM169.967 30.0541C171.052 30.0541 172.212 29.7908 172.773 29.5651V26.1046C172.249 26.3679 171.389 26.6688 170.603 26.6688C169.63 26.6688 168.844 26.2174 168.844 24.7128V17.3028H172.773V14.1431H168.844V9.02752H165.139V14.1055H162.595V17.2651H165.102V25.3899C165.102 28.2486 166.898 30.0541 169.967 30.0541ZM2.73357 14.1431H11.2281C11.5258 14.1431 11.8114 14.262 12.0219 14.4736C12.2324 14.6853 12.3507 14.9723 12.3507 15.2716V15.7229C12.3507 16.0222 12.2324 16.3092 12.0219 16.5209C11.8114 16.7325 11.5258 16.8514 11.2281 16.8514H6.36338C6.10143 16.8514 5.6898 17.0771 5.6898 17.6037C5.6898 18.1303 6.06401 18.356 6.36338 18.356H13.3236C13.6214 18.356 13.9069 18.4749 14.1174 18.6865C14.328 18.8981 14.4463 19.1851 14.4463 19.4844V19.9358C14.4463 20.2351 14.328 20.5221 14.1174 20.7337C13.9069 20.9453 13.6214 21.0642 13.3236 21.0642H6.36338C6.10143 21.0642 5.6898 21.3275 5.6898 21.8165C5.6898 22.3431 6.06401 22.6064 6.36338 22.6064H12.5004C12.7981 22.6064 13.0837 22.7253 13.2942 22.9369C13.5047 23.1486 13.623 23.4356 13.623 23.7349V24.1486C13.623 24.4479 13.5047 24.7349 13.2942 24.9466C13.0837 25.1582 12.7981 25.2771 12.5004 25.2771H6.36338C6.10143 25.2771 5.6898 25.5404 5.6898 26.0294C5.6898 26.5936 6.06401 26.8569 6.36338 26.8569H10.2177C10.5154 26.8569 10.801 26.9758 11.0115 27.1874C11.2221 27.399 11.3403 27.686 11.3403 27.9853V28.3615C11.3403 28.6607 11.2221 28.9478 11.0115 29.1594C10.801 29.371 10.5154 29.4899 10.2177 29.4899H2.73357C2.05999 29.4899 1.68579 29.4523 1.31158 28.5495C0.433074 26.3929 -0.0125742 24.083 0.000269931 21.7526C0.0131141 19.4222 0.484197 17.1174 1.38642 14.9706C1.72321 14.1431 2.13484 14.1431 2.73357 14.1431ZM45.468 31.0697V35.9596C45.468 36.4862 45.019 36.9376 44.4577 36.9376H8.68346C8.42186 36.9378 8.17038 36.836 7.98194 36.6536C7.7935 36.4712 7.68279 36.2224 7.6731 35.9596V31.0697H10.1054C11.6023 31.0697 12.7623 29.8661 12.7623 28.3991V27.9853C12.7595 27.5943 12.67 27.2088 12.5004 26.8569C13.1919 26.8276 13.8448 26.5281 14.32 26.0223C14.7952 25.5165 15.0553 24.8443 15.045 24.1486V23.7725C15.0479 23.2198 14.8777 22.6803 14.5585 22.2303C15.3069 21.7413 15.8682 20.9138 15.8682 19.9358V19.522C15.8682 18.1679 14.8205 17.0018 13.5107 16.889C13.6978 16.5128 13.7727 16.1367 13.7727 15.6853V15.3092C13.7727 13.8046 12.5752 12.6385 11.1532 12.6385H7.6731V8.61376C7.6731 8.04954 8.12215 7.59817 8.68346 7.59817H44.4577C45.019 7.59817 45.468 8.04954 45.468 8.61376V12.6385H41.9131C40.4537 12.6385 39.2936 13.8046 39.2936 15.2716V15.6853C39.2791 16.0861 39.3559 16.485 39.5181 16.8514C38.8798 16.9334 38.2927 17.2455 37.866 17.7298C37.4393 18.214 37.2019 18.8375 37.1981 19.4844V19.9358C37.1981 20.9138 37.7219 21.7413 38.4704 22.1927C38.1645 22.6471 38.0075 23.1863 38.0213 23.7349V24.1486C38.0213 25.578 39.1439 26.7817 40.5285 26.8193C40.3589 27.1712 40.2694 27.5567 40.2665 27.9477V28.3991C40.2665 29.8661 41.464 31.0321 42.9234 31.0321H45.4306L45.468 31.0697ZM36.8613 28.0982C35.5604 29.5283 33.976 30.6688 32.21 31.4462C30.4441 32.2236 28.5358 32.6207 26.608 32.6119C24.6767 32.6077 22.7668 32.2049 20.9967 31.4284C19.2265 30.652 17.6339 29.5185 16.3173 28.0982C15.5315 27.1954 16.5418 25.9541 17.627 26.7817C20.1342 28.6624 23.2401 29.7156 26.608 29.7156C29.8125 29.7593 32.9423 28.7415 35.5141 26.8193C36.5245 26.067 37.6471 27.1954 36.8238 28.0982H36.8613ZM27.2441 0.188073V5.83028C27.2441 5.94312 27.319 6.01835 27.4312 6.01835H43.7841C44.9816 6.01835 44.757 5.07798 44.3828 4.77706L39.8923 0.639449C39.4807 0.188073 39.0691 0 38.0213 0H27.4687C27.3564 0 27.2816 0.0752294 27.2816 0.188073H27.2441ZM25.7847 5.83028V0.188073C25.7847 0.0752294 25.7099 0 25.5976 0H15.1198C14.072 0 13.623 0.225688 13.2114 0.639449L8.72088 4.77706C8.34667 5.1156 8.15957 6.01835 9.35703 6.01835H25.5976C25.7099 6.01835 25.7847 5.94312 25.7847 5.83028ZM50.183 14.1431H41.8382C41.5405 14.1431 41.2549 14.262 41.0444 14.4736C40.8339 14.6853 40.7156 14.9723 40.7156 15.2716V15.7229C40.7156 16.0222 40.8339 16.3092 41.0444 16.5209C41.2549 16.7325 41.5405 16.8514 41.8382 16.8514H46.7029C46.9649 16.8514 47.3391 17.0771 47.3391 17.6037C47.3391 18.1303 46.9649 18.356 46.7029 18.356H39.7427C39.4449 18.356 39.1594 18.4749 38.9488 18.6865C38.7383 18.8981 38.62 19.1851 38.62 19.4844V19.9358C38.62 20.2351 38.7383 20.5221 38.9488 20.7337C39.1594 20.9453 39.4449 21.0642 39.7427 21.0642H46.7029C46.9649 21.0642 47.3391 21.3275 47.3391 21.8165C47.3391 22.3431 46.9649 22.6064 46.7029 22.6064H40.5659C40.2682 22.6064 39.9826 22.7253 39.7721 22.9369C39.5616 23.1486 39.4433 23.4356 39.4433 23.7349V24.1486C39.4433 24.4479 39.5616 24.7349 39.7721 24.9466C39.9826 25.1582 40.2682 25.2771 40.5659 25.2771H46.7029C46.9649 25.2771 47.3391 25.5404 47.3391 26.0294C47.3391 26.5936 46.9649 26.8569 46.7029 26.8569H42.8486C42.5508 26.8569 42.2653 26.9758 42.0548 27.1874C41.8442 27.399 41.726 27.686 41.726 27.9853V28.3615C41.726 28.6607 41.8442 28.9478 42.0548 29.1594C42.2653 29.371 42.5508 29.4899 42.8486 29.4899H50.183C51.0063 29.4899 51.3431 29.4899 51.7547 28.4367C53.4812 24.1678 53.4812 19.39 51.7547 15.1211C51.3431 14.1431 50.9315 14.1431 50.183 14.1431Z"
                    fill="#F50057"
                  />
                </svg>
                <Typography
                  sx={{ fontWeight: 700, padding: '110px 0' }}
                  variant="h3"
                  component="h3"
                >
                  Login
                </Typography>
                <Box sx={{ width: '375px' }}>
                  <form onSubmit={loginForm.handleSubmit}>
                    <FormControl sx={{ width: '375px', marginBottom: '50px' }}>
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <FilledInput
                        id="email"
                        name="email"
                        type="email"
                        value={loginForm.values.email}
                        onChange={loginForm.handleChange}
                        error={
                          loginForm.touched.email &&
                          Boolean(loginForm.errors.email)
                        }
                      />
                    </FormControl>
                    <FormControl sx={{ width: '375px', marginBottom: '50px' }}>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <FilledInput
                        id="password"
                        name="password"
                        fullWidth
                        type={isVisiblePassword ? 'text' : 'password'}
                        value={loginForm.values.password}
                        onChange={loginForm.handleChange}
                        error={
                          loginForm.touched.password &&
                          Boolean(loginForm.errors.password)
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {isVisiblePassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <Button
                      disabled={disabled}
                      sx={{ backgroundColor: '#F50057 !important' }}
                      fullWidth
                      variant="contained"
                      type="submit"
                    >
                      LOGIN
                    </Button>
                  </form>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SignInScreen;
