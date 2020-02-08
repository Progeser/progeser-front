import {Resource} from './resource';
import {Type} from 'class-transformer';

export class AccountRequest extends Resource {
  firstName: string;
  lastName: string;
  email: string;
  comment?: string;
  accepted?: boolean;

  @Type(() => Date)
  createdAt?: Date;

  @Type(() => Date)
  updatedAt?: Date;
}
