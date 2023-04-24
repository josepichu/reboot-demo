import { Menu } from '../models/App/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

export const menu: Menu[] = [
  {
    id: 1,
    path: '/',
    label: 'Home',
    icon: <HomeIcon />,
    roles: 'user',
  },
  {
    id: 3,
    path: '/admin',
    label: 'Admin',
    roles: 'admin',
    icon: <SettingsIcon />,
  },
];
