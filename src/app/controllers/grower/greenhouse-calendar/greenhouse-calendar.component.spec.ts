import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenhouseCalendarComponent } from './greenhouse-calendar.component';

describe('GreenhouseCalendarComponent', () => {
  let component: GreenhouseCalendarComponent;
  let fixture: ComponentFixture<GreenhouseCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenhouseCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenhouseCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
