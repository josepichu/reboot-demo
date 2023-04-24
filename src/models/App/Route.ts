import { BaseModel } from '../BaseModel';
import { Roles } from './Roles';

export interface Route extends BaseModel {
  path: string;
  element: JSX.Element;
  roles?: Roles;
}
