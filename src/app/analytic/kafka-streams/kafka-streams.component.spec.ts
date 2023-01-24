import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaStreamsComponent } from './kafka-streams.component';

describe('KafkaStreamsComponent', () => {
  let component: KafkaStreamsComponent;
  let fixture: ComponentFixture<KafkaStreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KafkaStreamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkaStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
