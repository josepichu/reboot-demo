import React, { FC } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import { Route, Routes } from 'react-router-dom';
import { routes } from '../../config/router';
import { Route as AppRoute } from '../../models/App/Route';
import NavBar from './NavBar/NavBar';
import Sidebar from './SideBar/SideBar';
import { useAuth } from '../../context/AuthProvider';

const Layout: FC = () => {
  const { hasAccess } = useAuth();

  const buildRoute = (route: AppRoute) => {
    return !route.roles || hasAccess(route.roles) ? (
      <Route key={route.id} path={route.path} element={route.element} />
    ) : null;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar />
      <Sidebar />
      <Container maxWidth="lg">
        <Routes>{routes.map((route: AppRoute) => buildRoute(route))}</Routes>
      </Container>
    </Box>
  );
};

export default Layout;
