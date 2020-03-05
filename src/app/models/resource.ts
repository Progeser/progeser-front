import {isNullOrUndefined} from 'util';

export class Resource {
  id: number;

  isNewResource() {
    return isNullOrUndefined(this.id);
  }
}
