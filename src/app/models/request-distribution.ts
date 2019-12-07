import {PlantStage} from './plant-stage';
import {Bench} from './bench';
import {Pot} from './pot';
import {Resource} from './resource';

export class RequestDistribution extends Resource {
  plantStage: PlantStage;
  bench: Bench;
  surfaceInputtedManually: boolean;
  quantity?: number;
  pot?: Pot;
  manualSurface?: number;
}
