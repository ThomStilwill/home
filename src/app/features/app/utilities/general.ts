import { from, of } from "rxjs";
import { concatMap, delay } from "rxjs/operators";

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
