import {TransformationType} from 'class-transformer';
import {ModelableInterface, Shape} from '../../models/shape';
import {isNullOrUndefined} from 'util';
import {transformCentimeterAttribute, transformMeterAttribute} from './unit-converters';

export function transformShapeAttribute(value, modelable: ModelableInterface, type): any {
  if (TransformationType.CLASS_TO_PLAIN === type) {
    return value.name;
  }

  return value;
}

export function transformShapeAreaCentimeterAttribute(value, modelable: ModelableInterface, type): any {
  if (modelable.shape.name !== Shape.otherShape.name) {
    return undefined;
  }

  return transformCentimeterAttribute(value, modelable, type);
}

export function transformShapeAreaMeterAttribute(value, modelable: ModelableInterface, type): any {
  if (modelable.shape.name !== Shape.otherShape.name) {
    return undefined;
  }

  return transformMeterAttribute(value, modelable, type);
}

export function transformCentimeterDimensionAttribute(value, modelable: ModelableInterface, type): any {
  if (TransformationType.PLAIN_TO_CLASS === type
    && null == value) {
    return [];
  }

  if (TransformationType.CLASS_TO_PLAIN === type
      && 0 === value.length) {
    return undefined;
  }

  return value;
}

export function transformMeterDimensionAttribute(value: number[] | null | undefined, modelable: ModelableInterface, type): any {
  if (TransformationType.PLAIN_TO_CLASS === type) {
    if (isNullOrUndefined(value)) {
      return [];
    }

    return value.map(dimension => transformMeterAttribute(dimension, modelable, type));
  }

  if (TransformationType.CLASS_TO_PLAIN === type) {
    if (0 === value.length) {
      return undefined;
    }

    return value.map(dimension => transformMeterAttribute(dimension, modelable, type));
  }

  return value;
}
