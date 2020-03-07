import {TransformationType} from 'class-transformer';

export function transformCentimeterAttribute(value, object: object, type): any {
  if (TransformationType.PLAIN_TO_CLASS === type) {
    return Number(value);
  }

  if (TransformationType.CLASS_TO_PLAIN === type) {
    return value.toFixed(2);
  }

  return undefined;
}

export function transformMeterAttribute(value, object: object, type): any {
  if (TransformationType.PLAIN_TO_CLASS === type) {
    return Number(value / 100);
  }

  if (TransformationType.CLASS_TO_PLAIN === type) {
    return (value * 100).toFixed(2);
  }

  return undefined;
}
