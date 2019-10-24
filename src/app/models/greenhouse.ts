import {Bench} from './bench';

export class Greenhouse {
  static exampleData: Greenhouse[] = [
    {
      name: 'Serre polyvalente',
      length: 50,
      width: 20,
      benches: Bench.exampleData,
    },
    {
      name: 'Serre isolée',
      length: 80,
      width: 30,
      benches: Bench.exampleData,
    },
    {
      name: 'Terrain en plein air',
      length: 60,
      width: 50,
      benches: Bench.exampleData,
    }
  ];

  name: string;
  length: number;
  width: number;
  benches: Bench[];
}
