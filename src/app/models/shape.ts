export class Shape {
  static otherShape: Shape = {
    name: 'autre',
    dimensionNames: []
  };

  static exampleData: Shape[] = [
    {
      name: 'Rectangle',
      dimensionNames: ['Longueur', 'Largeur']
    },
    {
      name: 'Carré',
      dimensionNames: ['Longueur']
    },
    {
      name: 'Autre',
      dimensionNames: ['Surface']
    }
  ];

  name: string;
  dimensionNames?: string[] = [];
}

export interface ModelableInterface {
  shape?: Shape;
  area?: number;
  dimensions?: number[];
}
