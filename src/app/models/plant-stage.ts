import {Resource} from './resource';

export class PlantStage extends Resource{
  static exampleData: PlantStage[] = [
    {
      id: 1,
      name: 'Graine',
      duration: 20
    },
    {
      id: 2,
      name: 'Jeune pousse',
      duration: 15
    },
    {
      id: 3,
      name: 'Haute pousse',
      duration: 20
    }
  ];

  name: string;
  duration: number;
}
