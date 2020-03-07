import {Bench} from './bench';
import {Resource} from './resource';
import {Transform, Type} from 'class-transformer';
import {transformMeterAttribute} from '../utils/data-converters/unit-converters';

export class Greenhouse extends Resource {
  static exampleData: Greenhouse[] = [];

  name: string;

  @Transform(transformMeterAttribute)
  height: number;

  @Transform(transformMeterAttribute)
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
