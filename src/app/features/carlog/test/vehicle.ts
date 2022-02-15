import { GridItem } from "../core/grid/gridItem";

export class Vehicle extends GridItem {

  make: string;
  model: string;
  year: number;

  constructor (make: string, model: string, year: number) {
    super();
    this.make = make;
    this.model = model;
    this.year = year;
  }
}
