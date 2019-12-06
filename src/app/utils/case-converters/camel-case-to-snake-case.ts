import {CaseConverter} from './case-converter';

export class CamelCaseToSnakeCase extends CaseConverter {
  convertString(camelCaseString: string): string {
    return camelCaseString
      .replace(/[\w]([A-Z])/g, (m) => m[0] + '_' + m[1])
      .toLowerCase();
  }
}
