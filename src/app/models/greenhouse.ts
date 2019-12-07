import {Bench} from './bench';
import {Resource} from './resource';

export class Greenhouse extends Resource {
  static exampleData: Greenhouse[] = [
    {
      id: 1,
      name: 'Serre polyvalente',
      length: 50,
      width: 20,
      benches: Bench.exampleData,
      occupation: 90,
    },
    {
      id: 2,
      name: 'Serre isolée',
      length: 80,
      width: 30,
      benches: Bench.exampleData,
      occupation: 20,
    },
    {
      id: 3,
      name: 'Terrain en plein air',
      length: 60,
      width: 50,
      benches: Bench.exampleData,
      occupation: 36,
    }
  ];

  name: string;
  length: number;
  width: number;
  benches: Bench[] = [];
  occupation: number;

  public static calculateArableSurface(greenhouse: Greenhouse) {
    return greenhouse.benches
      .map(bench => bench.surface)
      .reduce((accumulator, current) => accumulator + current, 0);
  }
}
