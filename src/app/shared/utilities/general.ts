import { of, from } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';

export default class General{

    static delayTitle(items:string[], func: (item:string)=> void) {

        from(items).pipe(
            concatMap(item => of(item).pipe(delay(500)))
        )
        .subscribe(y => {
            func(y)
        });
    }

    static iterateOver(object: any): any[] {
      const keys = Object.keys(object);

      return keys.map(key => object[key]);
    }
}
