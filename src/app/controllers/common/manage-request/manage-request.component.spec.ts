import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRequestComponent } from './manage-request.component';

describe('RequesterManageRequestComponent', () => {
  let component: ManageRequestComponent;
  let fixture: ComponentFixture<ManageRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
