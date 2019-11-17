import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountRequestComponent } from './manage-account-request.component';

describe('ManageAccountRequestComponent', () => {
  let component: ManageAccountRequestComponent;
  let fixture: ComponentFixture<ManageAccountRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAccountRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
