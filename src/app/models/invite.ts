import {Resource} from './resource';
import {Transform} from 'class-transformer';
import {transformLaboratoryAttribute} from '../utils/data-converters/invite-converters';

export class Invite extends Resource {
  email: string;
  role: string;
  firstName: string;
  lastName: string;

  @Transform(transformLaboratoryAttribute)
  laboratory?: string;
}
