import { Component, OnInit, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { GridComponent } from '../../shared/grid/grid.component';
import gridoptions from './log-grid-options.json';
import { Event } from './event';

import { LogAction } from '../models/log-action';
import { Logrecord } from '../models/log-record';
import { LogService } from '../services/log.service';
import { LogEditComponent } from '../log-edit/log-edit.component';

import { Schedule } from '../models/schedule';
import { ScheduleService } from '../services/schedule.service';

// Hack alert
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'log-grid',
  templateUrl: './log-grid.component.html',
  styleUrls: ['./log-grid.component.scss']
})

export class LogGridComponent extends GridComponent<Event>
                              implements OnInit {
  events: Array<Event>;
  gridoptions: any;
  schedules: Schedule[];
  modalName = 'editlog';

  @ViewChild('parent', { read: ViewContainerRef, static: true })
  parent: ViewContainerRef;
  callback: Function;

  constructor(private service: LogService,
              private scheduleService: ScheduleService,
              private modalService: ModalService,
              cdr: ChangeDetectorRef
              ) {
    super(cdr);
    const logrecord = new Logrecord();
    this.keys = Object.keys(logrecord);
  }

  ngOnInit() {

    this.callback = this.boundcallback.bind(this);
    this.gridoptions = gridoptions;
    this.load();
  }

  load() {
    this.scheduleService.getall()
    .subscribe((schedules) => {
        this.schedules = schedules;

        // HACK instead of chaining promises
        this.service.getall()
          .subscribe((data) => {
              this.events = data.map(function(item: Logrecord) {

                  const scheduleid = item.schedules && item.schedules.length ? item.schedules[0].id : null;
                  const schedule = schedules.find(x => x.id == scheduleid);
                  const description = (!schedule) ? '' : schedule.description;

                  return new Event(item.id, item.date, item.mileage, item.event, item.note, description);
                });

              //console.log(this.events);
        });
    });
  }

  boundcallback(changed: boolean) {
    if (changed) {
      this.load();
    }
    this.modalService.close(this.modalName);
  }

  resolveSchedule(schedules: any) {

    let key = null;

    if (schedules instanceof  Array) {
      key = schedules[0] && schedules[0].id || null;
    } else {
      key = schedules;
    }

    const schedule = this.schedules.filter((s) => {
        return s.id == key;
    });

    return schedule[0] && schedule[0].description;
  }

  add() {
    this.openedit(LogAction.Add, null);
  }

  edit(item: Event) {
    this.openedit(LogAction.Edit, this.map(item));
  }

  copy(item: Event) {
    this.openedit(LogAction.Copy, this.map(item));
  }

  delete(item: Event) {

    if (confirm('delete log: ' + item.id)) {
      this.service.delete(this.map(item))
      .subscribe(result => {
        this.load();
      });
    }
  }

  openedit( action: LogAction, item: Logrecord) {
    const logeditcomponent = this.modalService.open<LogEditComponent>(this.modalName, this.parent, LogEditComponent);
    const id = item && item.id || -1;
    logeditcomponent.init(action, id, this.callback)
    .then(() => {
      this.modalService.show(this.modalName, logeditcomponent.title, logeditcomponent.subtitle);
    });
  }

  map(item: Event) {
    return new Logrecord(item.id, item.date, item.mileage, item.event, item.note);
  }

}
