import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlantComponent } from './manage-plant.component';

describe('ManagePlantComponent', () => {
  let component: ManagePlantComponent;
  let fixture: ComponentFixture<ManagePlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
