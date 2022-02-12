import { GridItem } from '../../shared/grid/gridItem';

export class Vehicle extends GridItem {

  id: number;
  name: string;
  description: string;
  year: number;

  constructor (id: number, name: string, description: string, year: number) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.year = year;
  }
}
