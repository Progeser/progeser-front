import {PlantStage} from './plant-stage';
import {Resource} from './resource';

export class Plant extends Resource {
  static exampleData: Plant[] = [
    {
      id: 1,
      name: 'Rose',
      stages: PlantStage.exampleData
    },
    {
      id: 2,
      name: 'Petunia',
      stages: PlantStage.exampleData
    },
    {
      id: 3,
      name: 'Orchidée',
      stages: PlantStage.exampleData
    }
  ];

  name: string;
  stages: PlantStage[] = [];
}
