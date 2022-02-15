import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridComponent } from '../core/grid/grid.component';
import { Vehicle } from './vehicle';
import data from './vehicle-data.json';
import gridoptions from './vehicle-grid-options.json';

@Component({
  selector: 'vehicle-grid',
  templateUrl: './vehicle-grid.component.html',
  styleUrls: ['./vehicle-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleGridComponent extends GridComponent<Vehicle>
                                  implements OnInit {

  vehicles: Array<Vehicle>;
  gridoptions: any;

  getData(): Array<Vehicle> {
    return JSON.parse(JSON.stringify(data)).vehicles;
  }

  ngOnInit() {
    this.gridoptions = gridoptions;
    this.vehicles = this.getData();
  }

}
