import {ModelableInterface, Shape} from './shape';
import {Resource} from './resource';
import {Transform, Type} from 'class-transformer';
import {transformAreaAttribute, transformDimensionAttribute, transformShapeAttribute} from '../utils/data-converters/modelable-converters';

export class Pot extends Resource implements ModelableInterface {
  static exampleData: Pot[] = [];

  name: string;

  @Transform(transformShapeAttribute)
  @Type(() => Shape)
  shape?: Shape;

  @Transform(transformAreaAttribute)
  area?: number;

  @Transform(transformDimensionAttribute)
  dimensions?: number[];
}
