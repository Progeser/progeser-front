import {PlantStage} from './plant-stage';
import {Bench} from './bench';
import {Pot} from './pot';
import {Resource} from './resource';
import {Type} from 'class-transformer';

export class RequestDistribution extends Resource {
  @Type(() => PlantStage)
  plantStage: PlantStage;

  @Type(() => Bench)
  bench: Bench;

  surfaceInputtedManually: boolean;
  quantity?: number;

  @Type(() => Pot)
  pot?: Pot;

  manualSurface?: number;
}
