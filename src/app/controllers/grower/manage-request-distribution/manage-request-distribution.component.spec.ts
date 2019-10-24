import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRequestDistributionComponent } from './manage-request-distribution.component';

describe('ManageRequestDistributionComponent', () => {
  let component: ManageRequestDistributionComponent;
  let fixture: ComponentFixture<ManageRequestDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRequestDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRequestDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
