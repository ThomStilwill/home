import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Alert, AlertType, AlertState } from '../models/alert';

@Injectable()
export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {

            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false, timeout = 0) {
      this.alert(AlertType.Success, message, keepAfterRouteChange, timeout);
    }

    error(message: string, keepAfterRouteChange = false, timeout = 0) {
        this.alert(AlertType.Error, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange = false, timeout = 0) {
        this.alert(AlertType.Info, message, keepAfterRouteChange);
    }

    warn(message: string, keepAfterRouteChange = false, timeout = 0) {
        this.alert(AlertType.Warning, message, keepAfterRouteChange);
    }

    alert(type: AlertType, message: string, keepAfterRouteChange = false, timeout = 0) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        const alert = new Alert(type, message, timeout, AlertState.Opening);
        this.subject.next(alert);
    }

    clear() {
        this.subject.next(null);
    }
}
