import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRangeeComponent } from './list-rangee.component';

describe('ListRangeeComponent', () => {
  let component: ListRangeeComponent;
  let fixture: ComponentFixture<ListRangeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRangeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRangeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
