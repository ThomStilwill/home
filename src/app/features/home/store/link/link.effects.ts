import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from '@ngrx/effects';
import { of } from "rxjs";
import { map, catchError, mergeMap, tap, delay } from "rxjs/operators";
import { DataService } from "../../../../shared/services/data.service";
import  * as actions  from "./link.actions";
import { Link } from "./link.model";

@Injectable()
export class LinksEffects{

    constructor(
        private actions$:Actions, 
        private service: DataService
    ){}

    loadLinks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(actions.LoadLinks),
            mergeMap(() => 
                this.service.getItems<Link>('links-home')
                   .pipe(
                    tap(_=>console.log('Success')),
                    delay(1000),
                    map(links => 
                        actions.LoadLinksSuccess({ loading:'Success',list: links})
                        )
                    )
                ),
                catchError(error => of(actions.LoadLinksFailure({loading:'Fail',error})),
                )
            )
        );

    // addShopping$ = createEffect(() => 
    //     this.actions$.pipe(
    //         ofType(actions.AddItem),
    //         mergeMap(payload => this.service.addShoppingItem(payload.item)
    //             .pipe(
    //                     tap(_=>console.log('add')) ,
    //                     map(() => actions.AddItemSuccess({item:payload.item}))
    //                  )
    //             )
    //             ,catchError(error => of(actions.AddItemFailure({error})))
    //         )
    //     );

    // deleteShoppingItem$ = createEffect(() => 
    //     this.actions$.pipe(
    //         ofType(actions.DeleteItem),
    //         mergeMap(action => this.service.deleteShoppingItem(action.id)
    //             .pipe(
    //                     tap(_=>console.log('delete')),
    //                     map(() => actions.DeleteItemSuccess({id: action.id}))
    //                  )
    //             )
    //             ,catchError(error => of(actions.DeleteItemFailure({error})))
    //         )
    //     );
}
