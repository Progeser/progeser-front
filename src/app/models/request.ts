import {Plant} from './plant';
import {PlantStage} from './plant-stage';
import {RequestDistribution} from './request-distribution';
import {Resource} from './resource';
import {Expose, Transform, Type} from 'class-transformer';
import {transformNestedResourceIntoIdentifier} from '../utils/data-converters/resource-converters';
import {transformDate} from '../utils/data-converters/date-converters';

export class Request extends Resource {
  static STATUS = [
    'pending',
    'accepted',
    'declined',
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
  plantNotExists: boolean;
  quantity: number;

  // Plant and plantStage can be both Plant object or string as they could be an already known plant or the plant name
  @Transform(transformNestedResourceIntoIdentifier)
  @Expose({ name: 'plantId' })
  plant?: Plant;

  @Transform(transformNestedResourceIntoIdentifier)
  @Expose({ name: 'plantStageId' })
  plantStage?: PlantStage;

  plantName: string;
  plantStageName: string;

  temperature?: number;
  photoperiod?: number;

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
