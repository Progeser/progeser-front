import {ModelableInterface, Shape} from './shape';
import {Resource} from './resource';
import {Transform, Type} from 'class-transformer';
import {
  transformCentimeterDimensionAttribute,
  transformShapeAttribute,
  transformShapeAreaCentimeterAttribute
} from '../utils/data-converters/modelable-converters';

export class Pot extends Resource implements ModelableInterface {
  static exampleData: Pot[] = [];

  name: string;

  @Transform(transformShapeAttribute)
  @Type(() => Shape)
  shape?: Shape;

  @Transform(transformShapeAreaCentimeterAttribute)
  area?: number;

  @Transform(transformCentimeterDimensionAttribute)
  dimensions?: number[] = [];
}
