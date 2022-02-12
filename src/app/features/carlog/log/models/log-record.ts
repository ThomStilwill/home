import { LogSchedule } from './log-schedule';

export class Logrecord {
  id: number;
  date: Date;
  mileage: number;
  event: string;
  note: string;
  schedules: Array<LogSchedule>;

  constructor ( id: number = null,
                date: Date = null,
                mileage: number = null,
                event: string = null,
                note: string = null,
                schedules: Array<LogSchedule> = null) {
    this.id = id;
    this.date = date;
    this.mileage = mileage;
    this.event = event;
    this.note = note;
    this.schedules = schedules;
  }
}

