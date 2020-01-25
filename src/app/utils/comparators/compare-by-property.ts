import {isNullOrUndefined} from 'util';

export function compareByProperty(propertyName) {
  return (object1: any, object2: any) =>
    !isNullOrUndefined(object1)
    && !isNullOrUndefined(object2)
    && object1[propertyName] === object2[propertyName];
}
