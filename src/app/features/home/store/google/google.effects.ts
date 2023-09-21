import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from '@ngrx/effects';
import { of } from "rxjs";
import { map, catchError, mergeMap, tap, delay, concatMap } from "rxjs/operators";
import { DataService } from "../../../../shared/services/data.service";
import { GoogleActions }  from "./google.actions";
import { LinkBase } from "../models/linkbase.model";

@Injectable()
export class GoogleEffects{

    constructor(
        private actions$:Actions, 
        private service: DataService
    ){}

    loadLinks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(GoogleActions.loadGoogle),
            //delay(3000),
            concatMap((dump) => 
                this.service.getItems<LinkBase>('links-google')
                   .pipe(
                    tap(_=>console.log(dump)),
                    map(links => 
                        GoogleActions.loadGoogleSuccess({ links: links})
                        )
                    )
                ),
                catchError(error => of(GoogleActions.loadGoogleFailure({ error})),
                )
            )
        );
}
