import { Link, Outlet } from 'react-router-dom';
// import { UserMenu } from './UserMenu';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { selectToken } from 'redux/selectors';
import { logOutThunk } from 'redux/auth/thunk';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const SharedLayout = () => {
  const { user, access_token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleLogOut = e => {
    e.preventDefault();
    dispatch(logOutThunk());
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Button component={Link} to="/" sx={{ color: '#fff' }}>
                Home page
              </Button>
              <Button component={Link} to="/register" sx={{ color: '#fff' }}>
                Register page
              </Button>
              {!access_token && (
                <Button component={Link} to="/login" sx={{ color: '#fff' }}>
                  Login page
                </Button>
              )}
              <Button component={Link} to="/contacts" sx={{ color: '#fff' }}>
                Contacts
              </Button>
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 2, display: 'flex', justifyContent: 'end' }}
            >
              {user && (
                <Box display="flex" gap={2} alignItems="center">
                  <Typography variant="h6">{user.name}</Typography>
                  <Button
                    component={Link}
                    to="/logout"
                    sx={{ color: '#fff' }}
                    onClick={handleLogOut}
                  >
                    Logout
                  </Button>
                </Box>
              )}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
