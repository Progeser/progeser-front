import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGreenhouseComponent } from './manage-greenhouse.component';

describe('ManageGreenhouseComponent', () => {
  let component: ManageGreenhouseComponent;
  let fixture: ComponentFixture<ManageGreenhouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGreenhouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGreenhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
