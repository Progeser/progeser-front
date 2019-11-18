import {Shape} from './shape';

export class Pot {
  static exampleData: Pot[] = [
    {
      name: 'Pot carré 12x12',
      surface: 24,
      shape: Shape.exampleData[1]
    },
    {
      name: 'Pot rond 5x5',
      surface: 1,
      shape: Shape.exampleData[2]
    }
  ];

  name: string;
  surface: number;
  shape: Shape;
  dimensions?: number[];
}
