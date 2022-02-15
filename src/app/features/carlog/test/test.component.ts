import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AlertService } from '../core/services/alert.service';
import { LoadingService } from '../core/services/loading.service';

import { DialogService } from '../core/services/dialog.service';

@Component({
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: ['test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild('dialogContainer', { read: ViewContainerRef, static: false })
  dialogContainer: ViewContainerRef;

  constructor(private alertService: AlertService,
              private loading: LoadingService,
              private dialogService: DialogService) { }

  ngOnInit() {
  }

  success(message: string, timeout = 0) {
    this.alertService.success(message, false, timeout);
  }

  error(message: string) {
      this.alertService.error(message);
  }

  info(message: string) {
      this.alertService.info(message);
  }

  warn(message: string) {
      this.alertService.warn(message);
  }

  clear() {
      this.alertService.clear();
  }

  openDialog() {
     this.dialogService.open('testdialog', 'title');
  }

  closeDialog() {
    this.dialogService.close('testdialog');
  }

  testloader() {
    this.loading.show('Loader test...', 'a very long loading message which should extend the box.');
    setTimeout(() => {
      this.loading.hide();
    }, 4000);
  }
}
