import { Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth, useUser } from 'reactfire';
import clearFirestoreCache from '../../../common/clearFirestoreCache';

const HomeScreen: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const auth = useAuth();
  const { data } = useUser();
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
              {data.displayName
                ? data.displayName.split(' ').map((item) => item[0])
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
