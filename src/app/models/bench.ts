import {ModelableInterface, Shape} from './shape';
import {Resource} from './resource';
import {Transform, Type} from 'class-transformer';
import {
  transformShapeAreaMeterAttribute,
  transformShapeAttribute,
  transformMeterDimensionAttribute
} from '../utils/data-converters/modelable-converters';

export class Bench extends Resource implements ModelableInterface {
  name: string;

  @Transform(transformShapeAttribute)
  @Type(() => Shape)
  shape?: Shape;

  @Transform(transformShapeAreaMeterAttribute)
  area?: number;

  @Transform(transformMeterDimensionAttribute)
  dimensions?: number[] = [];
}
