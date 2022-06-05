import { Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import React, { useContext, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from 'reactfire';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import { UIContext } from '../UIContext';

const HomeScreen: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setAlert, userName } = useContext(UIContext);
  const auth = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    auth.signOut();
    clearFirestoreCache();
  };
  useEffect(() => {
    setAlert({
      show: true,
      severity: 'info',
      message: 'Welcome on board 🚀',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    });
  }, [setAlert]);
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <AppBar position="static" sx={{ backgroundColor: '#F50057' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Voypost
            </Typography>
          </div>
          <div className="">
            <Avatar onClick={handleClick}>
              {userName
                ? userName
                    .split(' ')
                    .map((item) => item[0])
                    .join('')
                : 'U'}
            </Avatar>
            <div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomeScreen;
