import {Resource} from './resource';
import {Transform} from 'class-transformer';
import {transformDate} from '../utils/data-converters/date-converters';

export class AccountRequest extends Resource {
  firstName: string;
  lastName: string;
  email: string;
  comment?: string;
  accepted?: boolean;

  @Transform(transformDate)
  createdAt?: Date;

  @Transform(transformDate)
  updatedAt?: Date;
}
