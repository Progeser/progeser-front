import {TransformationType} from 'class-transformer';
import {isNullOrUndefined} from 'util';
import {Request} from '../../models';
import {transformNestedResourceIntoIdentifier} from './resource-converters';

export function transformPlantNotExistsAttribute(value, object: any, type): any {
  if (TransformationType.PLAIN_TO_CLASS === type) {
    return isNullOrUndefined(object.plantId);
  }

  return value;
}

export function transformKnownPlantAttribute(value, request: Request, type): any {
  if (TransformationType.CLASS_TO_PLAIN === type && false !== request.plantNotExists) {
    return null;
  }

  return transformNestedResourceIntoIdentifier(value, request, type);
}

export function transformUnknownPlantAttribute(value, request: Request, type): any {
  if (TransformationType.CLASS_TO_PLAIN === type && true !== request.plantNotExists) {
    return null;
  }

  return value;
}
