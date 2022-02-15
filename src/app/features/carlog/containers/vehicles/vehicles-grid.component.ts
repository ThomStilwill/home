import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectorRef, ViewChild, ViewContainerRef } from '@angular/core';
import { GridComponent } from '../../core/grid/grid.component';
import gridoptions from './vehicles-grid-options.json';
import { Vehicle } from './vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { ModalService } from '../../core/services/modal.service';
import { LogAction } from '../../models/log-action';
import { VehicleEditComponent } from '../../components/vehicle-edit/vehicle-edit.component';

@Component({
  selector: 'vehicles-grid',
  templateUrl: './vehicles-grid.component.html',
  styleUrls: ['./vehicles-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehiclesGridComponent extends GridComponent<Vehicle>
                                  implements OnInit {

  gridoptions: any;
  vehicles: Array<Vehicle>;
  modalName = 'vehiclemodal';

  @ViewChild('parent', { read: ViewContainerRef, static: true })
  parent: ViewContainerRef;
  callback: Function;

  constructor(private service: VehicleService,
              private modalService: ModalService,
              cdr: ChangeDetectorRef) {

    super(cdr);
  }

  ngOnInit() {
    this.callback = this.boundcallback.bind(this);
    this.gridoptions = gridoptions;
    this.load();
  }

  load() {
    this.service.getall()
    .subscribe((vehicles) => {
      this.vehicles = vehicles.map((vehicle) => {
        return new Vehicle(vehicle.id, vehicle.name, vehicle.description, vehicle.year);
      });
    });
  }

   boundcallback(changed: boolean) {
    if (changed) {
      this.load();
    }
    this.modalService.close(this.modalName);
  }

  rowSelected(item: Vehicle) {
    this.selected = item;
  }

  add() {
    console.log('add');
    this.openedit(LogAction.Add, null);
  }

  edit(item: Vehicle) {
    console.log('edit');
    this.openedit(LogAction.Edit, item);
  }

  copy(item: Vehicle) {
    console.log('copy');
    this.openedit(LogAction.Copy, item);
  }

  delete(item: Vehicle) {

    if (confirm('delete vehicle: ' + item.name)) {
      this.service.delete(item)
      .subscribe(result => {
        this.load();
      });
    }
  }

  openedit( action: LogAction, item: Vehicle) {
    const editcomponent = this.modalService.open<VehicleEditComponent>(this.modalName, this.parent, VehicleEditComponent);
    const id = item && item.id || -1;
    editcomponent.init(action, id, this.callback)
    .then(() => {
      this.modalService.show(this.modalName, editcomponent.title, editcomponent.subtitle);
    });
  }

}
