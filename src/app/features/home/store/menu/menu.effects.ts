import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from '@ngrx/effects';
import { of } from "rxjs";
import { map, catchError, mergeMap, tap, delay, concatMap } from "rxjs/operators";
import { DataService } from "../../../../shared/services/data.service";
import { MenuActions } from "./menu.actions";
import { Menu } from "./menu";

@Injectable()
export class MenuEffects{

    constructor(
        private actions$:Actions, 
        private service: DataService
    ){}

    loadMenuss$ = createEffect(() => 
        this.actions$.pipe(
            ofType(MenuActions.loadMenus),
            concatMap((dump) => 
                this.service.getItems<Menu>('menus')
                   .pipe(
                    //tap(_=>console.log(`Menus: ${dump}`)),
                    map(menus => 
                        MenuActions.loadMenuSuccess({ menus: menus})
                        )
                    )
                ),
                catchError(error => of(MenuActions.loadMenuFailure({ error})),
                )
            )
        );
}
