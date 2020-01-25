import {TransformationType} from 'class-transformer';
import {ModelableInterface, Shape} from '../../models/shape';

export function transformShapeAttribute(value, modelable: ModelableInterface, type): any {
  if (TransformationType.CLASS_TO_PLAIN === type) {
    return value.name;
  }

  return value;
}

export function transformAreaAttribute(value, modelable: ModelableInterface, type): any {
  if (TransformationType.CLASS_TO_PLAIN === type
    && modelable.shape.name === Shape.otherShape.name) {
    return value;
  }

  return undefined;
}

export function transformDimensionAttribute(value, modelable: ModelableInterface, type): any {
  if (TransformationType.PLAIN_TO_CLASS === type
    && null == value) {
    return [];
  }

  return value;
}
