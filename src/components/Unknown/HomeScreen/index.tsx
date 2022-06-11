import { Box } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UIContext, useStyles } from '../UIContext';
import Header from '../Header/index';

const HomeScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const classes = useStyles();
  return (
    <>
      <Header />
      <Box mt={10} className={classes.justifyCenter}>
        <Link
          to="/flats"
          className={[classes.linkStyle, classes.containedSecondary].join(' ')}
        >
          Explore flats
        </Link>
      </Box>
    </>
  );
};

export default HomeScreen;
