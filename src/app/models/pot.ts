import {Shape} from './shape';
import {Resource} from './resource';

export class Pot extends Resource {
  static exampleData: Pot[] = [
    {
      id: 1,
      name: 'Pot carré 12x12',
      surface: 24,
      shape: Shape.exampleData[1]
    },
    {
      id: 2,
      name: 'Pot rond 5x5',
      surface: 1,
      shape: Shape.exampleData[2]
    }
  ];

  name: string;
  shape: Shape;
  surface?: number;
  dimensions?: number[];
}
