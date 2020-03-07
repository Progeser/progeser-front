import {TransformationType} from 'class-transformer';
import {isNumber} from 'util';

export function transformIntegerMeterAttribute(value, object: object, type): any {
  if (!isNumber(value)) {
    return value;
  }

  if (TransformationType.PLAIN_TO_CLASS === type) {
    return value / 100;
  }

  if (TransformationType.CLASS_TO_PLAIN === type) {
    return value * 100;
  }

  return undefined;
}

export function transformFloatCentimeterAttribute(value, object: object, type): any {
  if (TransformationType.PLAIN_TO_CLASS === type) {
    return Number(value);
  }

  if (TransformationType.CLASS_TO_PLAIN === type) {
    return value.toFixed(2);
  }

  return undefined;
}

export function transformFloatMeterAttribute(value, object: object, type): any {
  if (TransformationType.PLAIN_TO_CLASS === type) {
    return Number(value / 100);
  }

  if (TransformationType.CLASS_TO_PLAIN === type) {
    return (value * 100).toFixed(2);
  }

  return undefined;
}
