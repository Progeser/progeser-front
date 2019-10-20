import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterManageRequestComponent } from './requester-manage-request.component';

describe('RequesterManageRequestComponent', () => {
  let component: RequesterManageRequestComponent;
  let fixture: ComponentFixture<RequesterManageRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequesterManageRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterManageRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
