import {Plant} from './plant';
import {PlantStage} from './plant-stage';
import {RequestDistribution} from './request-distribution';

export class Request {
  static statusLabels = [
    'En attente',
    'Acceptée',
    'Refusée'
  ];

  static exampleData: Request[] = [
    {
      name: 'Roses pour le TP des M1',
      status: 1,
      creationDate: new Date('2019-09-05'),
      dueDate: new Date('2019-10-07'),
      plantExists: true,
      quantity: 50,
      plant: Plant.exampleData[0],
      plantStage: PlantStage.exampleData[0],
      comment: null,
      plantName: null,
      temperature: null,
      humidity: null,
      distributions: [],
    },
    {
      name: 'Raisin pour le TP des M2',
      status: 1,
      creationDate: new Date('2019-07-03'),
      dueDate: new Date('2019-11-07'),
      plantExists: false,
      quantity: 50,
      plant: null,
      plantStage: null,
      comment: 'Vous auriez du raisin dans vos serres ?',
      plantName: 'Raisin',
      temperature: null,
      humidity: null,
      distributions: [],
    },
    {
      name: 'Petunia pour le prochain gala',
      status: 1,
      creationDate: new Date('2019-09-18'),
      dueDate: new Date('2019-11-17'),
      plantExists: true,
      quantity: 200,
      plant: Plant.exampleData[1],
      plantStage: null,
      comment: null,
      plantName: null,
      temperature: null,
      humidity: null,
      distributions: [],
    },
    {
      name: 'Roses pour le TP des M1',
      status: 1,
      creationDate: new Date('2019-09-05'),
      dueDate: new Date('2019-10-07'),
      plantExists: true,
      quantity: 50,
      plant: Plant.exampleData[0],
      plantStage: PlantStage.exampleData[0],
      comment: null,
      plantName: null,
      temperature: null,
      humidity: null,
      distributions: [],
    },
    {
      name: 'Raisin pour le TP des M2',
      status: 1,
      creationDate: new Date('2019-07-03'),
      dueDate: new Date('2019-11-07'),
      plantExists: false,
      quantity: 50,
      plant: null,
      plantStage: null,
      comment: 'Vous auriez du raisin dans vos serres ?',
      plantName: 'Raisin',
      temperature: null,
      humidity: null,
      distributions: [],
    },
    {
      name: 'Petunia pour le prochain gala',
      status: 1,
      creationDate: new Date('2019-09-18'),
      dueDate: new Date('2019-11-17'),
      plantExists: true,
      quantity: 200,
      plant: Plant.exampleData[1],
      plantStage: null,
      comment: null,
      plantName: null,
      temperature: null,
      humidity: null,
      distributions: [],
    },
    {
      name: 'Roses pour le TP des M1',
      status: 1,
      creationDate: new Date('2019-09-05'),
      dueDate: new Date('2019-10-07'),
      plantExists: true,
      quantity: 50,
      plant: Plant.exampleData[0],
      plantStage: PlantStage.exampleData[0],
      comment: null,
      plantName: null,
      temperature: null,
      humidity: null,
      distributions: [],
    },
    {
      name: 'Raisin pour le TP des M2',
      status: 1,
      creationDate: new Date('2019-07-03'),
      dueDate: new Date('2019-11-07'),
      plantExists: false,
      quantity: 50,
      plant: null,
      plantStage: null,
      comment: 'Vous auriez du raisin dans vos serres ?',
      plantName: 'Raisin',
      temperature: null,
      humidity: null,
      distributions: [],
    },
    {
      name: 'Petunia pour le prochain gala',
      status: 1,
      creationDate: new Date('2019-09-18'),
      dueDate: new Date('2019-11-17'),
      plantExists: true,
      quantity: 200,
      plant: Plant.exampleData[1],
      plantStage: null,
      comment: null,
      plantName: null,
      temperature: null,
      humidity: null,
      distributions: [],
    }
  ];

  name: string;
  status: number;
  creationDate: Date;
  dueDate: Date;
  comment: string | null;
  plantExists: boolean;
  quantity: number;
  plant: Plant | null;
  plantName: string | null;
  plantStage: PlantStage | null;
  temperature: number | null;
  humidity: number | null;
  distributions: RequestDistribution[] = [];
}
