import {TransformationType} from 'class-transformer';
import {isNullOrUndefined} from 'util';

export function transformDate(date: Date, object: any, type): any {
  if (TransformationType.CLASS_TO_PLAIN === type && !isNullOrUndefined(date)) {
    return date.toISOString();
  }

  if (TransformationType.PLAIN_TO_CLASS === type) {
    return new Date(date);
  }

  return date;
}
