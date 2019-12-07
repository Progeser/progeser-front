import {Plant} from './plant';
import {PlantStage} from './plant-stage';
import {RequestDistribution} from './request-distribution';
import {Resource} from './resource';

export class Request extends Resource{
  static statusLabels = [
    'En attente',
    'Acceptée',
    'Refusée'
  ];

  static exampleData: Request[] = [
    {
      id: 1,
      name: 'Roses pour le TP des M1',
      status: 1,
      creationDate: new Date('2019-09-05'),
      cultureStartingDate: new Date('2019-09-25'),
      dueDate: new Date('2019-10-07'),
      plantExists: true,
      quantity: 50,
      plant: Plant.exampleData[0],
      plantStage: PlantStage.exampleData[0],
      comment: null,
      plantName: null,
      temperature: null,
      photoPeriod: null,
      distributions: [],
      color: '#746dff'
    },
    {
      id: 2,
      name: 'Raisin pour le TP des M2',
      status: 1,
      creationDate: new Date('2019-07-03'),
      cultureStartingDate: new Date('2019-08-21'),
      dueDate: new Date('2019-11-07'),
      plantExists: false,
      quantity: 50,
      plant: null,
      plantStage: null,
      comment: 'Vous auriez du raisin dans vos serres ?',
      plantName: 'Raisin',
      temperature: null,
      photoPeriod: null,
      distributions: [],
      color: '#ff333a'
    },
    {
      id: 3,
      name: 'Petunia pour le prochain gala',
      status: 1,
      creationDate: new Date('2019-09-18'),
      cultureStartingDate: new Date('2019-10-12'),
      dueDate: new Date('2019-11-17'),
      plantExists: true,
      quantity: 200,
      plant: Plant.exampleData[1],
      plantStage: null,
      comment: null,
      plantName: null,
      temperature: null,
      photoPeriod: null,
      distributions: [],
      color: '#7f7cff'
    },
    {
      id: 4,
      name: 'Roses pour le TP des M1',
      status: 1,
      creationDate: new Date('2019-09-05'),
      cultureStartingDate: new Date('2019-09-15'),
      dueDate: new Date('2019-10-07'),
      plantExists: true,
      quantity: 50,
      plant: Plant.exampleData[0],
      plantStage: PlantStage.exampleData[0],
      comment: null,
      plantName: null,
      temperature: null,
      photoPeriod: null,
      distributions: [],
      color: '#c24796'
    },
    {
      id: 5,
      name: 'Raisin pour le TP des M2',
      status: 1,
      creationDate: new Date('2019-07-03'),
      cultureStartingDate: new Date('2019-07-20'),
      dueDate: new Date('2019-11-07'),
      plantExists: false,
      quantity: 50,
      plant: null,
      plantStage: null,
      comment: 'Vous auriez du raisin dans vos serres ?',
      plantName: 'Raisin',
      temperature: null,
      photoPeriod: null,
      distributions: [],
      color: '#333333'
    },
    {
      id: 6,
      name: 'Petunia pour le prochain gala',
      status: 1,
      creationDate: new Date('2019-09-18'),
      cultureStartingDate: new Date('2019-11-12'),
      dueDate: new Date('2019-11-17'),
      plantExists: true,
      quantity: 200,
      plant: Plant.exampleData[1],
      plantStage: null,
      comment: null,
      plantName: null,
      temperature: null,
      photoPeriod: null,
      distributions: [],
      color: '#ffffff'
    },
    {
      id: 7,
      name: 'Roses pour le TP des M1',
      status: 1,
      creationDate: new Date('2019-09-05'),
      cultureStartingDate: new Date('2019-10-03'),
      dueDate: new Date('2019-10-07'),
      plantExists: true,
      quantity: 50,
      plant: Plant.exampleData[0],
      plantStage: PlantStage.exampleData[0],
      comment: null,
      plantName: null,
      temperature: null,
      photoPeriod: null,
      distributions: [],
      color: '#0035ff'
    },
    {
      id: 8,
      name: 'Raisin pour le TP des M2',
      status: 1,
      creationDate: new Date('2019-07-03'),
      cultureStartingDate: new Date('2019-11-01'),
      dueDate: new Date('2019-11-07'),
      plantExists: false,
      quantity: 50,
      plant: null,
      plantStage: null,
      comment: 'Vous auriez du raisin dans vos serres ?',
      plantName: 'Raisin',
      temperature: null,
      photoPeriod: null,
      distributions: [],
      color: '#0c69b9'
    },
    {
      id: 9,
      name: 'Petunia pour le prochain gala',
      status: 1,
      creationDate: new Date('2019-09-18'),
      cultureStartingDate: new Date('2019-11-08'),
      dueDate: new Date('2019-11-17'),
      plantExists: true,
      quantity: 200,
      plant: Plant.exampleData[1],
      plantStage: null,
      comment: null,
      plantName: null,
      temperature: null,
      photoPeriod: null,
      distributions: [],
      color: '#7f37cc'
    }
  ];

  name: string;
  status: number;
  creationDate: Date;
  cultureStartingDate: Date | null;
  dueDate: Date;
  comment: string | null;
  color: string | null;
  plantExists: boolean;
  quantity: number;
  plant: Plant | null;
  plantName: string | null;
  plantStage: PlantStage | null;
  temperature: number | null;
  photoPeriod: number | null;
  distributions: RequestDistribution[] = [];
}
