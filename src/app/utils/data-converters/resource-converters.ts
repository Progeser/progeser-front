import {TransformationType} from 'class-transformer';
import {Resource} from '../../models';
import {isNullOrUndefined} from 'util';

export function transformNestedResourceIntoIdentifier(value: Resource, resource: Resource, type): any {
  if (TransformationType.CLASS_TO_PLAIN === type && !isNullOrUndefined(value)) {
    return value.id;
  }

  return value;
}
