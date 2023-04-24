import React, { FC } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const NavBar: FC = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Reboot demo App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
