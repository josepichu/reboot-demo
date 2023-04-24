import { BaseModel } from '../BaseModel';
import { Roles } from './Roles';

export interface User extends BaseModel {
  name: string;
  email: string;
  password: string;
  roles: Roles;
}
