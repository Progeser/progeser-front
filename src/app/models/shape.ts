export class Shape {
  static exampleData: Shape[] = [
    {
      name: 'Rectangle',
      numberDimensions: 2,
      dimensionNames: ['Longueur', 'Largeur']
    },
    {
      name: 'Carré',
      numberDimensions: 1,
      dimensionNames: ['Longueur']
    },
    {
      name: 'Autre',
      numberDimensions: 1,
      dimensionNames: ['Surface']
    }
  ];

  name: string;
  numberDimensions: number;
  dimensionNames: string[];
}
