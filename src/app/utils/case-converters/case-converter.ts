import {isArray, isObject} from 'util';

export abstract class CaseConverter {
  abstract convertString(stringToConvert: string): string;

  convertKeys(originValue) {
    if (isArray(originValue)) {
      return originValue
        .map(item => this.convertKeys(item));
    } else if (isObject(originValue)) {
      const destinationObject = {};

      Object
        .keys(originValue)
        .map(key => {
          destinationObject[this.convertString(key)] = this.convertKeys(originValue[key]);
        });

      return destinationObject;
    }

    return originValue;
  }
}
