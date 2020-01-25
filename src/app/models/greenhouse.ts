import {Bench} from './bench';
import {Resource} from './resource';
import {Type} from 'class-transformer';

export class Greenhouse implements Resource {
  static exampleData: Greenhouse[] = [];

  id: number;
  name: string;
  height: number;
  width: number;

  @Type(() => Bench)
  benches: Bench[] = [];

  occupancy: number;

  calculateArableArea() {
    return this.benches
      .map(bench => bench.area)
      .reduce((accumulator, current) => accumulator + current, 0);
  }
}
