import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from '@ngrx/effects';
import { of } from "rxjs";
import { map, catchError, mergeMap, tap, delay } from "rxjs/operators";
import { DataService } from "../../../../shared/services/data.service";
import { LinkActions }  from "./link.actions";
import { Link } from "./link.model";

@Injectable()
export class LinkEffects{

    constructor(
        private actions$:Actions, 
        private service: DataService
    ){}

    loadLinks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LinkActions.loadLinks),
            delay(3000),
            mergeMap(() => 
                this.service.getItems<Link>('links-home')
                   .pipe(
                    tap(_=>console.log('Success')),
                    map(links => 
                        LinkActions.loadLinksSuccess({ links: links})
                        )
                    )
                ),
                catchError(error => of(LinkActions.loadLinksFailure({ error})),
                )
            )
        );

        loadWeather$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LinkActions.loadWeather),
            delay(3000),
            mergeMap(() => 
                this.service.getItems<Link>('weather')
                   .pipe(
                    tap(_=>console.log('Success')),
                    map(links => 
                        LinkActions.loadWeatherSuccess({ loading:'Stations loaded.', stations: links})
                        )
                    )
                ),
                catchError(error => of(LinkActions.loadWeatherFailure({loading:'Station Load Fail',error})),
                )
            )
        );

}
