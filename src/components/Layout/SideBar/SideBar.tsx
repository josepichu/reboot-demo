import React, { FC } from 'react';

import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { menu } from '../../../config/menu';
import { Menu as AppMenu } from '../../../models/App/Menu';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';

const Sidebar: FC = () => {
  const { isAuth, logout, hasAccess } = useAuth();

  const buildMenuItem = (menu: AppMenu) => {
    return (
      isAuth &&
      hasAccess(menu.roles) && (
        <Link key={menu.id} to={menu.path}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              {menu.label}
            </ListItemButton>
          </ListItem>
        </Link>
      )
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 300,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menu.map((menu: AppMenu) => buildMenuItem(menu))}
          {isAuth && (
            <Link to="" onClick={logout}>
              <ListItem key="logout" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  Logout
                </ListItemButton>
              </ListItem>
            </Link>
          )}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
