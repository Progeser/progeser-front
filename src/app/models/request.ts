import {Plant} from './plant';
import {PlantStage} from './plant-stage';
import {RequestDistribution} from './request-distribution';
import {Resource} from './resource';
import {Type} from 'class-transformer';

export class Request extends Resource {
  static statusLabels = [
    'En attente',
    'Acceptée',
    'Refusée'
  ];

  static exampleData: Request[] = [];

  name: string;
  status: number;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  cultureStartingAt?: Date;

  @Type(() => Date)
  dueDate: Date;

  comment?: string;
  color?: string;
  plantExists: boolean;
  quantity: number;

  @Type(() => Plant)
  plant?: Plant;

  plantName?: string;

  @Type(() => PlantStage)
  plantStage?: PlantStage;

  temperature?: number;
  photoPeriod?: number;

  @Type(() => RequestDistribution)
  distributions?: RequestDistribution[] = [];
}
