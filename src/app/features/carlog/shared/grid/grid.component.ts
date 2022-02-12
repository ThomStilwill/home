import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, Input,
         ChangeDetectorRef, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { faTrash, faEdit, faPlusCircle, faCopy, faCheckSquare, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import { Utilities } from '../utilities';
import { GridItem } from './gridItem';
import { Pager } from '../pager/pager';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent<T extends GridItem> implements OnInit, OnChanges, AfterViewInit {

  @Input() items: T[] = [];
  @Input() options: any;
  @ContentChild(TemplateRef, {static: true}) itemTemplate: TemplateRef<any>;

  @Output() addEvent = new EventEmitter<T>();
  @Output() editEvent = new EventEmitter<T>();
  @Output() copyEvent = new EventEmitter<T>();
  @Output() deleteEvent = new EventEmitter<T>();

  displayItems: T[] = [];
  filteredItems: T[] = [];
  pageItems: T[] = [];

  displayFirst: number;
  displayLast: number;
  pageSize: number;
  lastPage: number;
  currentPage = 0;

  keys: string[];
  selected: T;

  findtarget: string;
  messagenodata: string;

  deleteIcon = faTrash;
  editIcon = faEdit;
  addIcon = faPlusCircle;
  copyIcon = faCopy;
  selectIcon = faCheckSquare;
  sortUpIcon = faSortUp;
  sortDownIcon = faSortDown;
  unsortedIcon = faSort;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.pageSize = (this.options && this.options.pageSize) || 10;
    this.filter();
    this.messagenodata = 'No data';
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.items) {
      return;
    }

    if (changes.items.previousValue !== changes.items.currentValue) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].index = i;
      }
      this.filter();
    }
  }

  mouseWheelUp(event: any) {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.filter();
    }
  }

  mouseWheelDown(event: any) {
    if (this.currentPage < this.lastPage) {
      this.currentPage++;
      this.filter();
    }
  }

  onPageChanged($event) {
    const pager: Pager = $event;
    Utilities.load(this, pager);
    this.filter();
  }

  private textcompare(obj, match): boolean {
    const target = obj.toString();

    if (!match) {
      return true;
    }
    return target.toLowerCase().indexOf(match.toLowerCase()) > -1;
  }

  pageSizeChange() {
    this.currentPage = 0;
    this.filter();
  }

  findChange() {
    this.currentPage = 0;
    this.filter();
  }


  requestPage(pagenumber: number) {
    this.currentPage = pagenumber;
    this.filter();
  }

  private compare<T>(a: T, b: T, direction: string): number {
    const inverter = direction === 'asc' ? 1 : -1;
    let result = 0;

    if (a > b) {
      //console.log(a, '>', b);
      result = 1;
    }
    if (a < b) {
      //console.log(a, '<', b);
      result = -1;
    }

    return result * inverter;
  }

  comparer(a: T, b: T): number {
    const column = Utilities.find(Utilities.exists({sort: null}), this.options.columns);
    let result = 0;

    if (column) {
      const key = column.data;

      switch (column.type) {
        case 'date' : {
          result = this.compare<Date>(new Date(a[key]), new Date(b[key]), column.sort);
          break;
        }
        case 'number' : {
          result = this.compare<number>(Number.parseInt(a[key]), Number.parseInt(b[key]), column.sort);
          break;
        }
        default : {
          result = this.compare<string>(a[key], b[key], column.sort);
          break;
        }
      }

    }
    return result;
  }

  sort(items: T[]) {
    items.sort(this.comparer.bind(this)); // sort loses class context of this
    return items;
  }

  paginate(items: T[], pageNumber: number = 0): T[] {
    const pageitems = items.slice(pageNumber * this.pageSize, (pageNumber + 1) * this.pageSize);
    this.displayFirst = pageNumber * this.pageSize;
    this.displayLast = this.displayFirst + pageitems.length;

    if (this.displayLast) {
      this.displayFirst ++;
    }

    return pageitems;
  }

  filter() {

    if (!this.items) {
      return;
    }

    const predicate = (item) => {
      for (const key in item) {
        if (this.textcompare(item[key], this.findtarget)) {
          return true;
        }
      }
      return false;
    };

    this.filteredItems = this.items.filter((row) => {
      return predicate(row);
    });

    const sortedItems = this.sort(this.filteredItems);
    this.displayItems = this.paginate(sortedItems, this.currentPage);
  }

  rowSelected(item: T) {
    this.selected = item;
  }

  sortChange(i) {
    const column = this.options.columns[i];
    if (column.nosort) {
      return;
    }

    for (let x = 0; x < this.options.columns.length; x++) {
      if (x !== i) {
        delete this.options.columns[x].sort;
      }
    }

    if (column) {
      column.sort = column.sort === 'asc' ? 'desc' : 'asc';
    }
    this.filter();
  }

  cssSort(i) {

    const column = this.options.columns[i];

    let classname = '';

    if (!column || !column.sort) {

      if ( column.sort === 'desc') {
        classname =  'grid-sort-descending';
      }

      if ( column.sort === 'asc') {
        classname =  'grid-sort-ascending';
      }
    }

    if (!column.nosort) {
      classname += ' sortable';
    }

    return classname;
  }

  iconSort(i) {

    const column = this.options.columns[i];
    // console.log(i + ': ' + column.sort);

    if (!column || !column.sort) {
      return this.unsortedIcon;
    }

    if ( column.sort === 'desc') {
      return this.sortDownIcon;
    }

    if ( column.sort === 'asc') {
      return this.sortUpIcon;
    }

    return this.unsortedIcon;
  }

  select(item: T) {
    item.selected = !item.selected;
    console.log('select: ' + item);
  }

  add() {
    this.addEvent.emit();
  }

  edit(item: T) {
    this.editEvent.emit(item);
  }

  copy(item: T) {
    this.copyEvent.emit(item);
  }

  delete(item: T) {
    this.deleteEvent.emit(item);
  }

}
