import {Resource} from './resource';

export class Invite extends Resource {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  laboratory?: string;
}
