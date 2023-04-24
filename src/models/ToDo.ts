import { BaseModel } from './BaseModel';

export interface ToDo extends BaseModel {
  name: string;
  completed: boolean;
}
