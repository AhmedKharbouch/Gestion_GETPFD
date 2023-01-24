import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductsRangeeComponent } from './addproducts-rangee.component';

describe('AddproductsRangeeComponent', () => {
  let component: AddproductsRangeeComponent;
  let fixture: ComponentFixture<AddproductsRangeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddproductsRangeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddproductsRangeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
