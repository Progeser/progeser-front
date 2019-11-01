import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenhousesListComponent } from './greenhouses-list.component';

describe('GreenhousesListComponent', () => {
  let component: GreenhousesListComponent;
  let fixture: ComponentFixture<GreenhousesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenhousesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenhousesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
