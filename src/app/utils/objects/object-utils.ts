import {isObject} from 'util';

export abstract class ObjectUtils {
  static mergeDeep<T>(target: T, ...sources): T {
    if (!sources.length) {
      return target;
    }

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, {[key]: {}});
          }

          ObjectUtils.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, {[key]: source[key]});
        }
      }
    }

    return ObjectUtils.mergeDeep(target, ...sources);
  }
}
