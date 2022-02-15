import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Schedule } from '../../models/schedule';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleEditComponent } from '../schedule-edit/schedule-edit.component';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  items: Schedule[];
  keys: string[];
  callback: Function;

  @ViewChild('parent', { read: ViewContainerRef, static: true })
  parent: ViewContainerRef;

  constructor(private service: ScheduleService,
              private modalService: ModalService) {
    const item = new Schedule();
    this.keys = Object.keys(item);
   }

  ngOnInit() {
    this.callback = this.boundcallback.bind(this);
    this.load();
  }

  load() {
    this.service.getall()
    .subscribe((data) => {
      this.items = data.sort((a: Schedule , b: Schedule) => {
                    return a.id - b.id;
                  });
    });
  }

  boundcallback(changed: boolean) {
    if (changed) {
      this.load();
    }
    this.modalService.close('editschedule');
  }

  openedit(add = false, item: Schedule) {
    const component = this.modalService.open<ScheduleEditComponent>('editschedule', this.parent, ScheduleEditComponent);
    const id = item && item.id || -1;
    component.init(add, id, this.callback)
    .then(() => {
      this.modalService.show('editschedule', component.title, component.subtitle);
    });
  }

  add() {
   this.openedit(true, null);
  }

  edit(item: Schedule) {
   this.openedit(false, item);
  }

  delete(item: Schedule) {

    if (confirm('delete log: ' + item.id)) {
      this.service.delete(item)
      .subscribe(result => {
        this.load();
      });
    }
  }

}
