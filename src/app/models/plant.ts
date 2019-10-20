import {PlantState} from './plant-state';

export class Plant {
  static exampleData: Plant[] = [
    {
      name: 'Rose',
      states: PlantState.exampleData
    },
    {
      name: 'Petunia',
      states: PlantState.exampleData
    },
    {
      name: 'Orchidée',
      states: PlantState.exampleData
    }
  ];

  name: string;
  states: PlantState[];
}
