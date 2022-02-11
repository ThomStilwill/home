import { GridItem } from '../../shared/grid/gridItem';

export class Event extends GridItem {
  id: number;
  date: Date;
  mileage: number;
  event: string;
  note: string;
  schedule: string;

  constructor (id: number, date: Date, mileage: number, event: string, note: string, schedule: string) {
    super();
    this.id = id;
    this.date = date;
    this.mileage = mileage;
    this.event = event;
    this.note = note;
    this.schedule = schedule;
  }
}
