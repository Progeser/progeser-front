import {User} from './user';

export class Requester extends User {
  lab: string;
  responsible: User | string | null;
}
