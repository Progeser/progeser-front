import {Bench} from './bench';
import {Resource} from './resource';
import {Transform, Type} from 'class-transformer';
import {transformIntegerMeterAttribute} from '../utils/data-converters/unit-converters';

export class Greenhouse extends Resource {
  static exampleData: Greenhouse[] = [];

  name: string;

  @Transform(transformIntegerMeterAttribute)
  height: number;

  @Transform(transformIntegerMeterAttribute)
  width: number;

  @Type(() => Bench)
  benches: Bench[] = [];

  occupancy: number;
}
