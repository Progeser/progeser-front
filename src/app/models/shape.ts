import {Resource} from './resource';

export class Shape extends Resource {
  static exampleData: Shape[] = [
    {
      id: 1,
      name: 'Rectangle',
      numberDimensions: 2,
      dimensionNames: ['Longueur', 'Largeur']
    },
    {
      id: 2,
      name: 'Carré',
      numberDimensions: 1,
      dimensionNames: ['Longueur']
    },
    {
      id: 3,
      name: 'Autre',
      numberDimensions: 1,
      dimensionNames: ['Surface']
    }
  ];

  name: string;
  numberDimensions: number;
  dimensionNames: string[];
}

export interface ModelableInterface {
  shape: Shape;
  dimensions?: number[];
}
