import { TestBed } from '@angular/core/testing';
import {CamelCaseToSnakeCase} from './camel-case-to-snake-case';

describe('Camel case to snake case converter', () => {
  const camelCaseToSnakeCaseConverter = new CamelCaseToSnakeCase();

  const object = {
    foo: 'foo',
    fooBar: 'fooBar',
    dummy_data: 'dummy_data'
  };

  const expectedObject =  {
    foo: 'foo',
    foo_bar: 'fooBar',
    dummy_data: 'dummy_data'
  };

  const array = [
    {
      first_data: 'first_data',
      secondData: 'second_data'
    },
    {
      lastData: 'lastData'
    }
  ];

  const convertedArray = [
    {
      first_data: 'first_data',
      second_data: 'second_data'
    },
    {
      last_data: 'lastData'
    }
  ];

  beforeEach(() => TestBed.configureTestingModule({}));

  it('converted object should contains snake case keys', () => {
    expect(camelCaseToSnakeCaseConverter.convertKeys(object)).toEqual(expectedObject);
  });

  it('converted array should contains objects with snake case keys', () => {
    expect(camelCaseToSnakeCaseConverter.convertKeys(array)).toEqual(convertedArray);
  });
});
