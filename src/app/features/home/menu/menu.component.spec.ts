import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuitemComponent } from './menu.component';

describe('MenuitemComponent', () => {
  let component: MenuitemComponent;
  let fixture: ComponentFixture<MenuitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuitemComponent]
    });
    fixture = TestBed.createComponent(MenuitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
