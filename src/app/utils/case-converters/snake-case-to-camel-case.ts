import {CaseConverter} from './case-converter';

export class SnakeCaseToCamelCase extends CaseConverter {
  convertString(snakeCaseString: string): string {
    return snakeCaseString.replace(
      /([-_][a-z])/g,
      (group) => group.toUpperCase()
        .replace('-', '')
        .replace('_', '')
    );
  }
}
