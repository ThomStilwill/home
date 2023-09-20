import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from '@ngrx/effects';
import { ProgressActions } from "./progress.actions";
import { tap } from "rxjs";

@Injectable()
export class ProgressEffects{

    constructor(
        private actions$:Actions
    ){}

    show$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(ProgressActions.showProgress),
                tap( message => {
                    console.log(`Show Progress ${message}`)
                    //debugger;
                }))
            },
    { functional: true, dispatch: false }
    )
}
