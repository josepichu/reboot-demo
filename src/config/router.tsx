import { Route } from '../models/App/Route';
import Admin from '../pages/Admin';
import Details from '../pages/Details';
import Home from '../pages/Home';
import Login from '../pages/Login';

export const routes: Route[] = [
  {
    id: 1,
    path: '/',
    element: <Home />,
    roles: 'user',
  },
  {
    id: 2,
    path: '/details/:id',
    element: <Details />,
    roles: 'user',
  },
  {
    id: 3,
    path: '/admin',
    element: <Admin />,
    roles: 'admin',
  },
  {
    id: 4,
    path: '/super-admin',
    element: <Admin />,
    roles: 'admin',
  },
  {
    id: 5,
    path: '/login',
    element: <Login />,
  },
];
