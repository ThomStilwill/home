import { CrudModel } from '../core/services/crud-model';

export class Vehicle implements CrudModel {
  id: number;
  name: string;
  year: number;
  description: string;

  constructor () {
    this.id = null;
    this.description = null;
    this.name = null;
    this.year = null;
  }
}
