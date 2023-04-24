import { BaseModel } from '../BaseModel';
import { Roles } from './Roles';

export interface Menu extends BaseModel {
  path: string;
  label: string;
  roles: Roles;
  isAuthenticate?: boolean;
  icon: JSX.Element;
}
