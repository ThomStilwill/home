import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadrouteComponent } from './badroute.component';

describe('BadrouteComponent', () => {
  let component: BadrouteComponent;
  let fixture: ComponentFixture<BadrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadrouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
