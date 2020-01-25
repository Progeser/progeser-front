import {ModelableInterface, Shape} from './shape';
import {Resource} from './resource';
import {Transform, Type} from 'class-transformer';
import {transformAreaAttribute, transformDimensionAttribute, transformShapeAttribute} from '../utils/data-converters/modelable-converters';

export class Pot implements Resource, ModelableInterface {
  static exampleData: Pot[] = [ // todo: delete example data
    {
      id: 1,
      name: 'Pot carré 12x12',
      area: 24,
      shape: Shape.exampleData[1]
    },
    {
      id: 2,
      name: 'Pot rond 5x5',
      area: 1,
      shape: Shape.exampleData[2]
    }
  ];

  id: number;
  name: string;

  @Transform(transformShapeAttribute)
  @Type(() => Shape)
  shape?: Shape;

  @Transform(transformAreaAttribute)
  area?: number;

  @Transform(transformDimensionAttribute)
  dimensions?: number[];
}
