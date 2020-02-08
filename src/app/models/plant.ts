import {PlantStage} from './plant-stage';
import {Resource} from './resource';
import {Expose, Type} from 'class-transformer';

export class Plant extends Resource {
  static exampleData: Plant[] = [];

  name: string;

  @Expose({ name: 'plantStages' })
  @Type(() => PlantStage)
  stages: PlantStage[] = [];
}
