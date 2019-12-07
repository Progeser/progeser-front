import {Shape} from './shape';
import {Resource} from './resource';

export class Bench extends Resource {
  static exampleData: Bench[] = [
    {
      id: 1,
      name: 'Petite tablette',
      shape: Shape.exampleData[0],
      surface: 10,
      dimensions: null
    },
    {
      id: 2,
      name: 'Tablette sur-élevée',
      shape: Shape.exampleData[0],
      surface: 25,
      dimensions: null
    },
    {
      id: 3,
      name: 'Tablette grise',
      shape: Shape.exampleData[0],
      surface: 11,
      dimensions: null
    }
  ];

  name: string;
  shape: Shape;
  surface?: number;
  dimensions?: number[];
}
