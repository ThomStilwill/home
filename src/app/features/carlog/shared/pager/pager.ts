export class Pager {
  displayFirst: number;
  displayLast: number;
  lastPage: number;
  currentPage: number;
  pageSize: number;

  constructor() {
    this.displayFirst = null;
    this.displayLast = null;
    this.lastPage = null;
    this.currentPage = null;
    this.pageSize = null;
  }
}
