import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprioriComponent } from './apriori.component';

describe('AprioriComponent', () => {
  let component: AprioriComponent;
  let fixture: ComponentFixture<AprioriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprioriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprioriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
