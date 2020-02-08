import {Resource} from './resource';
import {Expose} from 'class-transformer';

export class PlantStage extends Resource {
  static exampleData: PlantStage[] = [];

  name: string;
  duration: number;
  position: number;

  @Expose({ name: '_destroy' })
  deleted: boolean;
}
