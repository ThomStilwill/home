import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { Pager } from './pager';

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit, OnChanges {

  @Input() pageSize: number;
  @Input() currentPage = 0;
  @Input() filteredItemslength = 0;
  @Input() pageLength = 0;

  @Output() pageChanged = new EventEmitter<Pager>();

  displayFirst: number;
  displayLast: number;
  lastPage: number;
  pagerPages: number[];
  pagesToShow = 4;

  constructor() { }

  ngOnInit() {
    this.requestPage(this.currentPage);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentPage && changes.currentPage.previousValue !== changes.currentPage.currentValue) {
      this.requestPage(this.currentPage);
    }
  }

  emitChange() {
    const pager = new Pager();

    pager.currentPage = this.currentPage;
    pager.lastPage = this.lastPage;
    pager.displayFirst = this.displayFirst;
    pager.displayLast = this.displayLast;
    pager.pageSize  = this.pageSize;

    this.pageChanged.emit(pager);
  }

  requestPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.paginate();
    this.emitChange();
  }

  pageSizeChange() {
    this.requestPage(this.currentPage);
  }

  paginate() {
    this.lastPage =  Math.trunc(this.filteredItemslength / this.pageSize);

    if (this.currentPage > this.lastPage) {
      this.currentPage = this.lastPage;
    }

    const itemcount = (this.currentPage * this.pageSize);
    this.displayFirst = itemcount + 1;
    this.displayLast = itemcount + this.pageSize;
    if (this.displayLast > this.filteredItemslength) {
      this.displayLast = itemcount + this.pageLength;
    }

    this.pagerPages = [];

    const bookendPages = Math.round(this.pagesToShow / 2);
    let pagerPagesStart = this.currentPage - bookendPages;
    if (pagerPagesStart < 0) {
      pagerPagesStart = 0;
    }
    let pagerPagesEnd = pagerPagesStart + 1 + bookendPages * 2;
    if (pagerPagesEnd > this.lastPage ) {
      pagerPagesEnd = this.lastPage + 1;
    }

    if (pagerPagesEnd - pagerPagesStart < this.pagesToShow + 1) {
      pagerPagesStart = pagerPagesEnd - (1 + bookendPages * 2);
      if (pagerPagesStart < 0) {
        pagerPagesStart = 0;
      }
    }

    for (let i = pagerPagesStart; i < pagerPagesEnd; i++) {
      this.pagerPages.push(i);
    }
  }
}
