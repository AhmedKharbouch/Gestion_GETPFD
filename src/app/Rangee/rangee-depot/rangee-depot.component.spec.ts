import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeeDepotComponent } from './rangee-depot.component';

describe('RangeeDepotComponent', () => {
  let component: RangeeDepotComponent;
  let fixture: ComponentFixture<RangeeDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeeDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeeDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
