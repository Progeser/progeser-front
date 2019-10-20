export class PlantState {
  static exampleData: PlantState[] = [
    {
      name: 'Jeune pousse',
      surfaceNeeded: 2,
      duration: 15
    },
    {
      name: 'Haute pousse',
      surfaceNeeded: 3,
      duration: 20
    }
  ];

  name: string;
  surfaceNeeded: number;
  duration: number;
}
