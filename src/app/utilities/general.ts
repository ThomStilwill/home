import { Title } from '@angular/platform-browser';
import { of, merge, from } from 'rxjs';
import { mapTo, delay, concatMap } from 'rxjs/operators';

export default class General{

    static delayTitle(items:string[], func: (item:string)=> void) {

        from(items).pipe(
            concatMap(item => of(item).pipe(delay(500)))
        )
        .subscribe(y => {
            func(y)
        });
    }
}
