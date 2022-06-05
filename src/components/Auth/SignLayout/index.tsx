import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ImageListItem from '@mui/material/ImageListItem';

const SignLayout: React.FC = ({ children }) => {
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
            {children}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SignLayout;
