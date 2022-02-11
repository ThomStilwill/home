import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faTimesCircle, faInfoCircle, faExclamationTriangle, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Alert, AlertType, AlertState } from '../models/alert';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.scss']
})

export class AlertComponent implements OnInit {

  alerts: Alert[] = [];
  closeIcon = faTimes;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.alertService.getAlert().subscribe((alert: Alert) => {
          if (!alert) {
              this.alerts = [];
              return;
          }
          this.alerts.push(alert);

          if (alert.timeout > 0) {
            console.log('timeout set to ' + alert.timeout);
            setTimeout(() => {
              console.log('timed out');
              this.removeAlert(alert);
            }, alert.timeout);
          }
      });
  }

  removeAlert(alert: Alert) {
      alert.state = AlertState.Closing;
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 500);
  }

  cssFade(alert: Alert): string {
    if (!alert) {
      return null;
    }

    switch (alert.state) {
      case AlertState.Opening:
        return 'fade-in';
      case AlertState.Closing:
        return 'fade-out';
    }

    return '';
  }

  cssClass(alert: Alert): string {
      if (!alert) {
          return null;
      }

      switch (alert.type) {
          case AlertType.Success:
              return 'alert alert-success';
          case AlertType.Error:
              return 'alert alert-danger';
          case AlertType.Info:
              return 'alert alert-info';
          case AlertType.Warning:
              return 'alert alert-warning';
      }
  }

  icon(alert: Alert): IconDefinition {
    if (!alert) {
        return null;
    }

    switch (alert.type) {
        case AlertType.Success:
            return faCheckCircle;
        case AlertType.Error:
            return faTimesCircle;
        case AlertType.Info:
            return faInfoCircle;
        case AlertType.Warning:
            return faExclamationTriangle;
    }
}
}
