import {PlantStage} from './plant-stage';

export class Plant {
  static exampleData: Plant[] = [
    {
      name: 'Rose',
      stages: PlantStage.exampleData
    },
    {
      name: 'Petunia',
      stages: PlantStage.exampleData
    },
    {
      name: 'Orchidée',
      stages: PlantStage.exampleData
    }
  ];

  name: string;
  stages: PlantStage[] = [];
}
