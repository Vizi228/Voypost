import { Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import React, { useCallback, useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth, useUser } from 'reactfire';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import { UIContext, useStyles } from '../UIContext';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setAlert, userName } = useContext(UIContext);
  const auth = useAuth();
  const { data } = useUser();
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getAbbreviateName = useCallback(() => {
    const name = userName || data.displayName;
    if (name) {
      return name
        .trim()
        .split(' ')
        .map((item) => item[0])
        .join('');
    }
    return 'U';
  }, [data.displayName, userName]);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      clearFirestoreCache();
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
  return (
    <Box>
      <AppBar position="static" color="secondary">
        <Toolbar className={classes.space}>
          <Box className={classes.alignCenter}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Voypost
            </Typography>
          </Box>
          <>
            <Avatar onClick={handleClick}>{getAbbreviateName()}</Avatar>
            <>
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
            </>
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
