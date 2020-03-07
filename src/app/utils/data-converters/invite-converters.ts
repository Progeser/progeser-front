import {TransformationType} from 'class-transformer';
import {Invite} from '../../models/invite';
import {isNullOrUndefined} from 'util';
import {User} from '../../models/user';

export function transformLaboratoryAttribute(value, object: Invite, type): any {
  if (isNullOrUndefined(value)
    || (TransformationType.CLASS_TO_PLAIN === type && User.roles[1] === object.role)) {
    return undefined;
  }

  return value;
}
