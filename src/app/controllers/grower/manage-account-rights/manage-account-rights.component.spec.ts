import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountRightsComponent } from './manage-account-rights.component';

describe('ManageAccountRightsComponent', () => {
  let component: ManageAccountRightsComponent;
  let fixture: ComponentFixture<ManageAccountRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAccountRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
