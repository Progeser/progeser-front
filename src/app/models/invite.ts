import {Resource} from './resource';

export class Invite implements Resource {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  laboratory?: string;
}
