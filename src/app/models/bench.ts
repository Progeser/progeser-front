import {ModelableInterface, Shape} from './shape';
import {Resource} from './resource';
import {Transform, Type} from 'class-transformer';
import {transformAreaAttribute, transformShapeAttribute} from '../utils/data-converters/modelable-converters';

export class Bench implements Resource, ModelableInterface {
  static exampleData: Bench[] = [
    {
      id: 1,
      name: 'Petite tablette',
      shape: Shape.exampleData[0],
      area: 10,
      dimensions: null
    },
    {
      id: 2,
      name: 'Tablette sur-élevée',
      shape: Shape.exampleData[0],
      area: 25,
      dimensions: null
    },
    {
      id: 3,
      name: 'Tablette grise',
      shape: Shape.exampleData[0],
      area: 11,
      dimensions: null
    }
  ];

  id: number;
  name: string;

  @Transform(transformShapeAttribute)
  @Type(() => Shape)
  shape?: Shape;

  @Transform(transformAreaAttribute)
  area?: number;

  dimensions?: number[];
}
