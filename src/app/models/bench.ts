import {Shape} from './shape';

export class Bench {
  static exampleData: Bench[] = [
    {
      name: 'Petite tablette',
      shape: Shape.exampleData[0],
      surface: 10,
      dimensions: null
    },
    {
      name: 'Tablette sur-élevée',
      shape: Shape.exampleData[0],
      surface: 25,
      dimensions: null
    },
    {
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
