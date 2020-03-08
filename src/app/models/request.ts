import {Plant} from './plant';
import {PlantStage} from './plant-stage';
import {RequestDistribution} from './request-distribution';
import {Resource} from './resource';
import {Expose, Transform, Type} from 'class-transformer';
import {transformDate} from '../utils/data-converters/date-converters';
import {
  transformKnownPlantAttribute,
  transformPlantNotExistsAttribute,
  transformUnknownPlantAttribute
} from '../utils/data-converters/request-converters';

export class Request extends Resource {
  static STATUS = [
    'pending',
    'accepted',
    'refused',
    'in_cancelation',
    'canceled'
  ];

  static PENDING = Request.STATUS[0];
  static ACCEPTED = Request.STATUS[1];
  static DECLINED = Request.STATUS[2];
  static IN_CANCELATION = Request.STATUS[3];
  static CANCELED = Request.STATUS[4];

  static exampleData: Request[] = [];

  name: string;
  status: string;

  @Transform(transformDate)
  createdAt: Date;

  @Transform(transformDate)
  cultureStartingAt?: Date;

  @Transform(transformDate)
  dueDate: Date;

  comment?: string;
  color?: string;
  quantity: number;

  @Expose({toClassOnly: true})
  @Transform(transformPlantNotExistsAttribute)
  plantNotExists: boolean;

  @Expose({name: 'plantId'})
  @Transform(transformKnownPlantAttribute)
  plant?: Plant | number;

  @Expose({name: 'plantStageId'})
  @Transform(transformKnownPlantAttribute)
  plantStage?: PlantStage | number;

  @Transform(transformUnknownPlantAttribute)
  plantName: string;

  @Transform(transformUnknownPlantAttribute)
  plantStageName: string;

  temperature?: number;
  photoperiod?: number;

  authorId: number;

  @Type(() => RequestDistribution)
  distributions?: RequestDistribution[] = [];

  isPending(): boolean {
    return Request.PENDING === this.status;
  }

  isAccepted(): boolean {
    return Request.ACCEPTED === this.status;
  }

  isDeclined(): boolean {
    return Request.DECLINED === this.status;
  }

  isInCancelation(): boolean {
    return Request.IN_CANCELATION === this.status;
  }

  isCanceled(): boolean {
    return Request.CANCELED === this.status;
  }
}
