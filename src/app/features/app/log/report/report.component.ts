import { Component, OnInit, ViewChild, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MinusToParensPipe } from '../../shared/minustoparens.pipe';

import { ScheduleService } from '../services/schedule.service';
import { LogService } from '../services/log.service';
import { ReportService } from '../services/report.service';

import { Logrecord } from '../models/log-record';
import { Schedule } from '../models/schedule';
import { Report } from '../report/report';
import { LogAction } from '../models/log-action';

import { ModalService } from '../../shared/services/modal.service';
import { LogEditComponent } from '../log-edit/log-edit.component';
import { faTrash, faEdit, faPlusCircle, faCopy} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ReportComponent implements OnInit {

  callback: Function;
  form: FormGroup;
  items: Array<Report>;
  keys: string[];
  logkeys: string[];
  today: Date;

  editIcon = faEdit;

  @ViewChild('parent', { read: ViewContainerRef, static: true })
  parent: ViewContainerRef;

  constructor(private service: LogService,
              private scheduleService: ScheduleService,
              private reportService: ReportService,
              private modalService: ModalService,
              private fb: FormBuilder) {
      this.keys = Object.keys(new Schedule()).filter(x => x !== 'id');
      this.logkeys = Object.keys(new Logrecord());
      this.createForm();
  }

  ngOnInit() {
    this.callback = this.boundcallback.bind(this);
    this.load();
    this.today = new Date();
  }

  onChanges(changes: any): void {
    if (this.form.value.id ) {
      this.reportService.update(this.form.value)
      .subscribe(result => {
      });
    } else {
      this.reportService.add(this.form.value)
      .subscribe(result => {
        this.form.value.id = result.id;
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      id: null,
      mileage: 60000,
      milesAlert1: 2000,
      milesAlert2: 4000
    });

    this.form.valueChanges.subscribe(changes => {
      this.onChanges(changes);
    });
  }


  edit(item: Logrecord) {
    this.openedit(LogAction.Edit, item);
  }

  boundcallback(changed: boolean) {
    if (changed) {
      this.load();
    }
    this.modalService.close('editlog');
  }

  openedit( action: LogAction, item: Logrecord) {
    const logeditcomponent = this.modalService.open<LogEditComponent>('editlog', this.parent, LogEditComponent);
    const id = item && item.id || -1;
    logeditcomponent.init(action, id, this.callback)
    .then(() => {
      this.modalService.show('editlog', logeditcomponent.title, logeditcomponent.subtitle);
    });
  }

  submit(form) {
    if (this.form.value.id ) {
      this.reportService.update(this.form.value)
      .subscribe(result => {
      });
    } else {
      this.reportService.add(this.form.value)
      .subscribe(result => {
        this.form.value.id = result.id;
      });
    }
  }

  alertMiles(schedule: Report, log: Logrecord) {
    const sinceService = this.form.value.mileage - log.mileage;
    const diff = schedule.miles - sinceService;

    if (!schedule.miles) {
      return null;
    }
    return diff;
  }

  alertStyle(schedule: Report, log: Logrecord) {
    const diff = this.alertMiles(schedule, log);

    if (this.lastlogid(schedule) !== log.id) {
      return 'hide';
    }

    if (!schedule.miles) {
      return null;
    }

    if (diff < 0) {
      return 'overdue';
    }

    if (diff < this.form.value.milesAlert1) {
      return 'info';
    }

    if (diff < this.form.value.milesAlert2) {
      return 'warning';
    }

    return 'good';
  }

  lastlogid(schedule: Report): number {
    const logs = schedule.logs.sort((a, b) => {
      return Date.parse(a.date.toString()) - Date.parse(b.date.toString());
    });

    return logs[logs.length - 1].id;
  }

  load() {
    this.items = new Array<Report>();
    this.reportService.getall()
    .subscribe(data => {
      if (data.length) {
        this.form.setValue(data[0]);
      }
    });

    this.scheduleService.getall()
    .subscribe((schedules) => {
      schedules.sort((a, b) => {
        if (a.description > b.description) { return 1; }
        if (a.description < b.description) { return -1; }
        return 0;
      });
      this.service.getall()
      .subscribe((logs) => {
        schedules.forEach((schedule) => {
          // this.items = new Array<Report>();
          const report = new Report();
          Object.assign(report, schedule);
          const schedulelogs = logs.filter(log => {
            return log.schedules && log.schedules.find(logschedule => logschedule.id == schedule.id);
          }).sort((a, b) => {
            return Date.parse(a.date.toString()) - Date.parse(b.date.toString());
          });
          report.logs = schedulelogs;
          this.items.push(report);
        });
      });
    });
  }
}
