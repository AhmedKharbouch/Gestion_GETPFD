import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingHomeComponent } from './banking-home.component';

describe('BankingHomeComponent', () => {
  let component: BankingHomeComponent;
  let fixture: ComponentFixture<BankingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
