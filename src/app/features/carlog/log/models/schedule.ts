import { CrudModel } from '../../shared/services/crud-model';

export class Schedule implements CrudModel {
  id: number;
  description: string;
  months: number;
  miles: number;
  note: string;

  constructor () {
    this.id = null;
    this.description = null;
    this.months = null;
    this.miles = 0;
    this.note = '';
  }
}
