import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { CrudService } from '../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService  extends CrudService<Vehicle> {
  protected url = 'vehicles';
}
