import {Bench} from './bench';

export class Greenhouse {
  static exampleData: Greenhouse[] = [
    {
      name: 'Serre polyvalente',
      length: 50,
      width: 20,
      benches: Bench.exampleData,
      occupation: 90,
    },
    {
      name: 'Serre isolée',
      length: 80,
      width: 30,
      benches: Bench.exampleData,
      occupation: 20,
    },
    {
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
  benches: Bench[];
  occupation: number;

  public static calculateArableSurface(greenhouse: Greenhouse) {
    return greenhouse.benches
      .map(bench => bench.surface)
      .reduce((accumulator, current) => accumulator + current, 0);
  }
}
