import {PlantStage} from './plant-stage';
import {Bench} from './bench';
import {Pot} from './pot';

export class RequestDistribution {
  plantStage: PlantStage;
  bench: Bench;
  surfaceInputtedManually: boolean;
  quantity?: number;
  pot?: Pot;
  manualSurface?: number;
}
