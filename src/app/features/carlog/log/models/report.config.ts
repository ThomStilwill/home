import { CrudModel } from '../../shared/services/crud-model';

export class ReportConfig implements CrudModel {
  id: number;
  mileage: number;
  milesAlert1: number;
  milesAlert2: number;

  constructor () {
    this.id = null;
    this.mileage = null;
    this.milesAlert1 = null;
    this.milesAlert2 = null;
  }
}
