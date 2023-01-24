import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrangeeTodepotComponent } from './addrangee-todepot.component';

describe('AddrangeeTodepotComponent', () => {
  let component: AddrangeeTodepotComponent;
  let fixture: ComponentFixture<AddrangeeTodepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrangeeTodepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrangeeTodepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
