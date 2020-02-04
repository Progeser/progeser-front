export class Shape {
  static otherShape: Shape = {
    name: 'other',
    displayName: 'autre',
    dimensionNames: []
  };

  static exampleData: Shape[] = [
    {
      name: 'Rectangle',
      displayName: 'Rectangle',
      dimensionNames: ['Longueur', 'Largeur']
    },
    {
      name: 'Square',
      displayName: 'Carré',
      dimensionNames: ['Longueur']
    },
    {
      name: 'Other',
      displayName: 'Autre',
      dimensionNames: ['Surface']
    }
  ];

  name: string;
  displayName: string;
  dimensionNames?: string[] = [];
}

export interface ModelableInterface {
  shape?: Shape;
  area?: number;
  dimensions?: number[];
}
