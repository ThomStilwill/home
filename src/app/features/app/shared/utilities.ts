import {Injectable} from '@angular/core';

@Injectable()
export class Utilities {

  static traverse(predicate, obj) {
    if (Object(obj) !== obj) {
      return null;
    }

    if (predicate(obj)) {
        return obj;
    }

    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            const result = this.traverse(predicate, obj[i]);
            if (result) {
                return result;
            }
        }
    }
  }

  static find(predicate, list) {
    if (!list) {
        return function _find(ls) {
            return this.find(predicate, ls);
        };
    }

    let i = 0;
    while ( i < list.length) {
        if (predicate(list[i])) {
            return list[i];
        }
        i++;
    }
  }

  static where = (spec, test = null) => {
    if (!test) {
        return function _where(tst) {
            return Utilities.where (spec, tst);
        };
    }
    for (const k in spec) {
        if (spec.hasOwnProperty(k)) {
            if (spec[k] !== test[k]) {
                return false;
            }
        }
    }
    return true;
  }

  static exists = (spec, test = null) => {
    if (!test) {
        return function _exists(tst) {
            return Utilities.exists (spec, tst);
        };
    }
    for (const k in spec) {
        if (test.hasOwnProperty(k)) {
          return true;
        }
    }
    return false;
  }

  static load(target, source) {
    for (const key in target) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
}
